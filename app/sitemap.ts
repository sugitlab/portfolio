import { MetadataRoute } from 'next';
import { getAllPostsInfo } from '../lib/posts';
import { SITE_URL } from '../lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsInfo();
  const baseUrl = SITE_URL;

  const postsUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postsUrls,
  ];
}
