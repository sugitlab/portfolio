import { getAllPostsInfo } from '../../lib/posts';
import { SITE_URL } from '../../lib/constants';

export async function GET() {
  const posts = getAllPostsInfo();
  
  const header = `# sugitlab.dev

Portfolio and blog of sugitlab (Sugit).
Software Engineer based in SHIGA, Japan.(Next to Kyoto.)

## Key Pages
- ${SITE_URL}/: Home
- ${SITE_URL}/profile: About me
- ${SITE_URL}/blog: Technical articles
- ${SITE_URL}/posts/id: Free blog posts

## Recent Posts
`;

  const postsList = posts.map(post => `- [${post.title}](${SITE_URL}/posts/${post.slug})`).join('\n');

  return new Response(header + postsList, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
