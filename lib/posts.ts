import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

interface MatterResultType {
  title: string;
  date: Date;
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

export async function getNeighbors(target: string) {
  const all = await getAllPostSlugs(); // <- このタイミングでreaddirSyncができないっぽい
  const index = all.findIndex((path) => path.params.slug === target);
  if (index <= 0 || all.length < 2) {
    // No Match (Unexpected) or single
    return {
      prev: undefined,
      next: undefined,
    };
  } else {
    // More than 3 posts
    return {
      prev: index == 0 ? undefined : all.at(index - 1)?.params.slug,
      next: index == all.length ? undefined : all.at(index + 1)?.params.slug,
    };
  }
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

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterData,
  };
}
