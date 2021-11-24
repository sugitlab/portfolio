import { CategoryType } from "./category";

export type ArticleType = "Zenn" | "Qiita" | "Medium" | "note" | "Post";
export type Article = {
  type: ArticleType;
  title: string;
  published: string;
  url: string;
  category: CategoryType;
};
