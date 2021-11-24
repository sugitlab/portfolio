import json from "./articles.json";
import { Article } from "./article";

export function getPosts(): Article[] {
  const articles = json.articles as Article[];

  // Sort by published date (needs to convert date string to actual Date type.
  articles.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  return articles;
}
