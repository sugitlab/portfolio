import fs from "fs";
import path from "path";
import matter from "gray-matter";
import markdownToHtml from "zenn-markdown-html";

const postsDirectory = path.join(process.cwd(), "posts");

interface MatterResultType {
  title: string;
  date: Date;
  icon?: string;
}

export interface PostDataType extends MatterResultType {
  slug: string;
  contentHtml: string;
}

// without contentHtml
export function getAllPostsInfo(): PostDataType[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter
    const matterResult = matter(fileContents);
    const matterData = matterResult.data as MatterResultType;

    return {
      slug,
      contentHtml: "",
      ...matterData,
    };
  });

  // Latest -> Old
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });

  return paths;
}

export async function getPostData(slug: string): Promise<PostDataType> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const matterData = matterResult.data as MatterResultType;

  const contentHtml = markdownToHtml(matterResult.content, {
    // embedOrigin: 'https://embed.zenn.studio',
  });

  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content);
  // const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterData,
  };
}
