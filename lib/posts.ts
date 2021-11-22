export type ArticleType = "Zenn" | "Qiita" | "Medium" | "note" | "Post";

export type Article = {
  type: ArticleType;
  title: string;
  published: string;
  url: string;
};

const demo: Article[] = [
  {
    type: "Zenn",
    title: "Demo Title",
    published: "2021/11/11",
    url: "https://zenn.dev/sugitlab",
  },
  {
    type: "Qiita",
    title: "Demo Title2",
    published: "2021/12/12",
    url: "https://qiita.com/sugitlab",
  },
  {
    type: "Medium",
    title: "Demo Title3",
    published: "2021/10/10",
    url: "https://sugitlab.medium.com/",
  },
  {
    type: "note",
    title: "Demo Title4",
    published: "2021/9/9",
    url: "https://note.com/sugitlab",
  },
  {
    type: "Post",
    title: "Private Post",
    published: "2021/8/8",
    url: "/test",
  },
];

export function getPosts(): Article[] {
  return demo;
}
