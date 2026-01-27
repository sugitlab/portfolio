import { SITE_URL } from "./constants";
import { PostDataType } from "./posts";

export function generateRssXml(posts: PostDataType[]): string {
  const latestPostDate = posts.length > 0 ? posts[0].date : new Date();
  const lastBuildDate = latestPostDate instanceof Date 
    ? latestPostDate.toUTCString() 
    : new Date(latestPostDate).toUTCString();

  const rssItemsXml = posts
    .map((post) => {
      const postDate = post.date instanceof Date 
        ? post.date.toUTCString() 
        : new Date(post.date).toUTCString();
      const postUrl = `${SITE_URL}/posts/${post.slug}`;

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${postDate}</pubDate>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>sugitlab - Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Blog posts by sugit</description>
    <language>ja</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;
}
