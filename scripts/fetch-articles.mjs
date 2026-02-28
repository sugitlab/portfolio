// @ts-check
/**
 * Fetch note and Zenn articles from their public APIs and update lib/articles.json.
 * Existing articles preserve their category; new articles get category
 * inferred from tags/hashtags and title.
 *
 * Usage: node scripts/fetch-articles.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, "../lib/articles.json");
const NOTE_USERNAME = "sugitlab";
const ZENN_USERNAME = "sugitlab";

// Keyword lists for category inference (lowercase)
const PM_KEYWORDS = [
  "pm", "プロダクトマネージャー", "プロダクト管理", "プロダクトマネジメント",
  "マネジメント", "事業", "越境",
];
const TECH_KEYWORDS = [
  "エンジニア", "技術", "プログラミング", "開発", "flutter", "dart",
  "tech", "programming", "software", "keyboard", "キーボード",
];
const LIFEHACK_KEYWORDS = [
  "ライフハック", "lifehack", "ガジェット", "買ってよかった", "生活",
  "健康", "icl", "レーシック",
];

/**
 * @param {string[]} tags - tag/hashtag names (any case)
 * @param {string} title
 */
function inferCategory(tags, title) {
  const targets = [...tags.map((t) => t.toLowerCase()), title.toLowerCase()];
  const hit = (kws) => targets.some((t) => kws.some((kw) => t.includes(kw)));
  if (hit(PM_KEYWORDS)) return "PM";
  if (hit(TECH_KEYWORDS)) return "Tech";
  if (hit(LIFEHACK_KEYWORDS)) return "LifeHack";
  return "Other";
}

// ---- note.com ----

/** @param {number} page */
async function fetchNotePage(page) {
  const url = `https://note.com/api/v2/creators/${NOTE_USERNAME}/contents?kind=note&page=${page}`;
  const res = await fetch(url, { headers: { "User-Agent": "portfolio-fetch-bot/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return /** @type {any} */ (await res.json());
}

async function fetchAllNoteArticles() {
  /** @type {any[]} */
  const all = [];
  let page = 1;
  while (true) {
    console.log(`[note] Fetching page ${page}…`);
    const json = await fetchNotePage(page);
    const contents = json?.data?.contents ?? [];
    all.push(...contents.filter((c) => c.status === "published"));
    if (json?.data?.isLastPage) break;
    page++;
  }
  return all;
}

// ---- Zenn ----

/** @param {number} page */
async function fetchZennArticlesPage(page) {
  const url = `https://zenn.dev/api/articles?username=${ZENN_USERNAME}&order=latest&page=${page}`;
  const res = await fetch(url, { headers: { "User-Agent": "portfolio-fetch-bot/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return /** @type {any} */ (await res.json());
}

async function fetchZennBooks() {
  const url = `https://zenn.dev/api/books?username=${ZENN_USERNAME}`;
  const res = await fetch(url, { headers: { "User-Agent": "portfolio-fetch-bot/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return /** @type {any} */ (await res.json());
}

async function fetchAllZennItems() {
  /** @type {{ title: string; published: string; url: string; tags: string[] }[]} */
  const all = [];

  let page = 1;
  while (true) {
    console.log(`[Zenn] Fetching articles page ${page}…`);
    const json = await fetchZennArticlesPage(page);
    const articles = json?.articles ?? [];
    all.push(
      ...articles.map((a) => ({
        title: a.title,
        published: a.published_at,
        url: `https://zenn.dev${a.path}`,
        tags: (a.topics ?? []).map((t) => t.name),
      }))
    );
    if (!json?.next_page) break;
    page++;
  }

  console.log(`[Zenn] Fetching books…`);
  const booksJson = await fetchZennBooks();
  const books = booksJson?.books ?? [];
  all.push(
    ...books.map((b) => ({
      title: b.title,
      published: b.published_at,
      url: `https://zenn.dev/${ZENN_USERNAME}/books/${b.slug}`,
      tags: (b.topics ?? []).map((t) => t.name),
    }))
  );

  return all;
}

// ---- Main ----

async function main() {
  const current = JSON.parse(readFileSync(ARTICLES_PATH, "utf8"));
  /** @type {Array<{ type: string; title: string; published: string; url: string; category: string }>} */
  const existing = current.articles;

  const existingNoteByUrl = new Map(
    existing.filter((a) => a.type === "note").map((a) => [a.url, a])
  );
  const existingZennByUrl = new Map(
    existing.filter((a) => a.type === "Zenn").map((a) => [a.url, a])
  );
  const otherArticles = existing.filter(
    (a) => a.type !== "note" && a.type !== "Zenn"
  );

  const [fetchedNotes, fetchedZenn] = await Promise.all([
    fetchAllNoteArticles(),
    fetchAllZennItems(),
  ]);
  console.log(`[note] ${fetchedNotes.length} articles fetched.`);
  console.log(`[Zenn] ${fetchedZenn.length} items fetched.`);

  const updatedNotes = fetchedNotes.map((c) => {
    const url = c.noteUrl ?? `https://note.com/${NOTE_USERNAME}/n/${c.key}`;
    if (existingNoteByUrl.has(url)) return existingNoteByUrl.get(url);
    return {
      type: "note",
      title: c.name,
      published: c.publishAt,
      url,
      category: inferCategory(
        (c.hashtag_notes ?? []).map((h) => h.hashtag?.name ?? ""),
        c.name ?? ""
      ),
    };
  });

  const updatedZenn = fetchedZenn.map((item) => {
    if (existingZennByUrl.has(item.url)) return existingZennByUrl.get(item.url);
    return {
      type: "Zenn",
      title: item.title,
      published: item.published,
      url: item.url,
      category: inferCategory(item.tags, item.title),
    };
  });

  const updated = { articles: [...updatedNotes, ...updatedZenn, ...otherArticles] };
  writeFileSync(ARTICLES_PATH, JSON.stringify(updated, null, 2) + "\n", "utf8");
  console.log(
    `Done. note: ${updatedNotes.length} articles, Zenn: ${updatedZenn.length} items.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
