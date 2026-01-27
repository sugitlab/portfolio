import { NextApiRequest, NextApiResponse } from "next";
import { getAllPostsInfo } from "../../lib/posts";
import { generateRssXml } from "../../lib/rss";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPostsInfo();
  const rssXml = generateRssXml(posts);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=300");
  res.status(200).send(rssXml);
}
