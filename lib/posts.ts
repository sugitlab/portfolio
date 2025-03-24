import fs from "fs";
import path from "path";
import markdownToHtml from "zenn-markdown-html";

const postsDirectory = path.join(process.cwd(), "posts");

// Simple frontmatter parser to replace gray-matter
function parseFrontmatter(fileContent: string): { content: string; data: any } {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---\s*([\s\S]*)/;
  const matches = frontmatterRegex.exec(fileContent);
  
  if (!matches) {
    return { content: fileContent, data: {} };
  }

  const frontmatterText = matches[1];
  const content = matches[2];
  
  // Parse the frontmatter data
  const data: Record<string, any> = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const colonPos = line.indexOf(':');
    if (colonPos !== -1) {
      const key = line.slice(0, colonPos).trim();
      let value = line.slice(colonPos + 1).trim();
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Handle dates
      if (key === 'date' && !isNaN(Date.parse(value))) {
        data[key] = new Date(value);
      } else {
        data[key] = value;
      }
    }
  }
  
  return { content, data };
}

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

    // Custom frontmatter parser
    const { data: matterData } = parseFrontmatter(fileContents);

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

  const { content, data: matterData } = parseFrontmatter(fileContents);

  const contentHtml = markdownToHtml(content, {
    embedOrigin: 'https://embed.zenn.studio',
  });

  return {
    slug,
    contentHtml,
    ...matterData,
  };
}
