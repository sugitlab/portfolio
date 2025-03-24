import json from "./articles.json";

export type CategoryType = "Tech" | "LifeHack" | "PM" | "Other";
export function getCategoryColor(category: CategoryType): string {
  switch (category) {
    case "Tech":
      return "bg-blue-500";
    case "LifeHack":
      return "bg-green-500";
    case "PM":
      return "bg-yellow-500";
    case "Other":
    default:
      return "bg-gray-500";
  }
}

export type ArticleType = "Zenn" | "Qiita" | "Medium" | "note" | "Post";
export type Article = {
  type: ArticleType;
  title: string;
  published: string;
  url: string;
  category: CategoryType;
};

export function getArticles(): Article[] {
  const articles = json.articles as Article[];

  // Sort by published date (needs to convert date string to actual Date type.
  articles.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  return articles;
}
