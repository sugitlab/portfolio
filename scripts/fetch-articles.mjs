// @ts-check
/**
 * Fetch note and Zenn articles via their official RSS/Atom feeds
 * and update lib/articles.json.
 *
 * - RSS feeds return only recent items, so existing articles are always
 *   preserved; new items are appended.
 * - Existing articles keep their manually assigned category.
 * - New articles get category inferred from tags + title.
 *
 * Usage: node scripts/fetch-articles.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { load } from "cheerio";

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
 * @param {string[]} tags
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

// ---- note.com (RSS 2.0) ----

async function fetchNoteRSS() {
  const url = `https://note.com/${NOTE_USERNAME}/rss`;
  const res = await fetch(url, { headers: { "User-Agent": "portfolio-fetch-bot/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  const xml = await res.text();
  const $ = load(xml, { xmlMode: true });

  return $("item")
    .map((_, el) => ({
      title: $(el).find("title").text(),
      url: $(el).find("link").text().trim(),
      // pubDate → ISO 8601
      published: new Date($(el).find("pubDate").text()).toISOString(),
      tags: $(el)
        .find("category")
        .map((_, cat) => $(cat).text())
        .get(),
    }))
    .get()
    .filter((item) => item.url);
}

// ---- Zenn (Atom) ----

async function fetchZennFeed() {
  const url = `https://zenn.dev/${ZENN_USERNAME}/feed`;
  const res = await fetch(url, { headers: { "User-Agent": "portfolio-fetch-bot/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  const xml = await res.text();
  const $ = load(xml, { xmlMode: true });

  return $("entry")
    .map((_, el) => ({
      title: $(el).find("title").text(),
      url: $(el).find("link").attr("href") ?? "",
      published: $(el).find("published").text(),
      tags: $(el)
        .find("category")
        .map((_, cat) => $(cat).attr("term") ?? "")
        .get(),
    }))
    .get()
    .filter((item) => item.url);
}

// ---- Main ----

async function main() {
  const current = JSON.parse(readFileSync(ARTICLES_PATH, "utf8"));
  /** @type {Array<{ type: string; title: string; published: string; url: string; category: string }>} */
  const existing = current.articles;

  // Build maps from existing articles (URL → article) to preserve categories
  const noteByUrl = new Map(
    existing.filter((a) => a.type === "note").map((a) => [a.url, a])
  );
  const zennByUrl = new Map(
    existing.filter((a) => a.type === "Zenn").map((a) => [a.url, a])
  );
  const otherArticles = existing.filter(
    (a) => a.type !== "note" && a.type !== "Zenn"
  );

  console.log("[note] Fetching RSS feed…");
  console.log("[Zenn] Fetching Atom feed…");
  const [noteItems, zennItems] = await Promise.all([
    fetchNoteRSS(),
    fetchZennFeed(),
  ]);
  console.log(`[note] ${noteItems.length} items in feed.`);
  console.log(`[Zenn] ${zennItems.length} items in feed.`);

  // Add only new articles (RSS returns recent items only, so we accumulate)
  let noteAdded = 0;
  for (const item of noteItems) {
    if (!noteByUrl.has(item.url)) {
      noteByUrl.set(item.url, {
        type: "note",
        title: item.title,
        published: item.published,
        url: item.url,
        category: inferCategory(item.tags, item.title),
      });
      noteAdded++;
    }
  }

  let zennAdded = 0;
  for (const item of zennItems) {
    if (!zennByUrl.has(item.url)) {
      zennByUrl.set(item.url, {
        type: "Zenn",
        title: item.title,
        published: item.published,
        url: item.url,
        category: inferCategory(item.tags, item.title),
      });
      zennAdded++;
    }
  }

  const updated = {
    articles: [
      ...[...noteByUrl.values()],
      ...[...zennByUrl.values()],
      ...otherArticles,
    ],
  };
  writeFileSync(ARTICLES_PATH, JSON.stringify(updated, null, 2) + "\n", "utf8");
  console.log(`Done. note: +${noteAdded} new, Zenn: +${zennAdded} new.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
