// @ts-check
/**
 * Fetch note articles from note.com API and update lib/articles.json.
 * Existing articles preserve their category; new articles get category
 * inferred from hashtags.
 *
 * Usage: node scripts/fetch-note-articles.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, "../lib/articles.json");
const NOTE_USERNAME = "sugitlab";

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

/** @param {{ hashtag: { name: string } }[]} hashtagNotes */
function inferCategory(hashtagNotes) {
  const tags = hashtagNotes.map((h) => (h.hashtag?.name ?? "").toLowerCase());
  for (const tag of tags) {
    if (PM_KEYWORDS.some((kw) => tag.includes(kw))) return "PM";
    if (TECH_KEYWORDS.some((kw) => tag.includes(kw))) return "Tech";
    if (LIFEHACK_KEYWORDS.some((kw) => tag.includes(kw))) return "LifeHack";
  }
  return "Other";
}

/** @param {number} page */
async function fetchPage(page) {
  const url = `https://note.com/api/v2/creators/${NOTE_USERNAME}/contents?kind=note&page=${page}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "portfolio-fetch-bot/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return /** @type {any} */ (await res.json());
}

async function main() {
  // ---- Load current articles.json ----
  const current = JSON.parse(readFileSync(ARTICLES_PATH, "utf8"));
  /** @type {Array<{ type: string; title: string; published: string; url: string; category: string }>} */
  const existing = current.articles;

  // Preserve existing note articles (by URL) to keep manually set categories
  const existingNoteByUrl = new Map(
    existing.filter((a) => a.type === "note").map((a) => [a.url, a])
  );
  const nonNoteArticles = existing.filter((a) => a.type !== "note");

  // ---- Fetch all published notes from note.com API ----
  /** @type {any[]} */
  const fetched = [];
  let page = 1;
  while (true) {
    console.log(`Fetching page ${page}…`);
    const json = await fetchPage(page);
    const contents = json?.data?.contents ?? [];
    for (const c of contents) {
      if (c.status === "published") fetched.push(c);
    }
    if (json?.data?.isLastPage) break;
    page++;
  }
  console.log(`Fetched ${fetched.length} published notes.`);

  // ---- Build updated note articles ----
  const updatedNotes = fetched.map((c) => {
    const url =
      c.noteUrl ?? `https://note.com/${NOTE_USERNAME}/n/${c.key}`;

    // Preserve existing entry (keeps manually assigned category)
    if (existingNoteByUrl.has(url)) return existingNoteByUrl.get(url);

    return {
      type: "note",
      title: c.name,
      published: c.publishAt,
      url,
      category: inferCategory(c.hashtag_notes ?? []),
    };
  });

  // ---- Write merged result ----
  const updated = { articles: [...updatedNotes, ...nonNoteArticles] };
  writeFileSync(ARTICLES_PATH, JSON.stringify(updated, null, 2) + "\n", "utf8");
  console.log(
    `Done. ${updatedNotes.length} note articles (${fetched.length - existingNoteByUrl.size} new).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
