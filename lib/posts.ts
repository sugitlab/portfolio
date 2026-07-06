import markdownToHtml from "zenn-markdown-html";

const owner = "sugitlab";
const repo = "portfolio";
const blogPostLabel = "blog-post";
let postIssuesPromise: Promise<GitHubIssue[]> | undefined;

type FrontmatterValue = string | Date;
type FrontmatterData = Record<string, FrontmatterValue>;

type GitHubIssue = {
  number: number;
  title: string;
  body: string | null;
  created_at: string;
  html_url: string;
  pull_request?: unknown;
};

function parseFrontmatter(fileContent: string): {
  content: string;
  data: FrontmatterData;
} {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)/;
  const matches = frontmatterRegex.exec(fileContent);

  if (!matches) {
    return { content: fileContent, data: {} };
  }

  const frontmatterText = matches[1];
  const content = matches[2];
  const data: FrontmatterData = {};

  for (const line of frontmatterText.split("\n")) {
    const colonPos = line.indexOf(":");
    if (colonPos === -1) {
      continue;
    }

    const key = line.slice(0, colonPos).trim();
    let value = line.slice(colonPos + 1).trim();

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (key === "date" && !Number.isNaN(Date.parse(value))) {
      data[key] = new Date(value);
    } else {
      data[key] = value;
    }
  }

  return { content, data };
}

function normalizeGitHubIssueMarkdown(content: string): string {
  return content.replace(/<img\b([^>]*)\/?>/gi, (match, attrs: string) => {
    const src = attrs.match(/\bsrc=(["'])(.*?)\1/i)?.[2];

    if (!src) {
      return match;
    }

    const alt = attrs.match(/\balt=(["'])(.*?)\1/i)?.[2] || "Image";
    return `![${alt}](${src})`;
  });
}

interface MatterResultType {
  title: string;
  date: Date;
  icon?: string;
}

export interface PostDataType extends MatterResultType {
  slug: string;
  contentHtml: string;
  issueNumber: number;
  issueUrl: string;
}

function githubToken(): string | undefined {
  return (
    process.env.BLOG_GITHUB_TOKEN ||
    process.env.GITHUB_TOKEN ||
    process.env.GH_TOKEN
  );
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "sugitlab-portfolio",
  };
  const token = githubToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchPostIssues(): Promise<GitHubIssue[]> {
  if (postIssuesPromise) {
    return postIssuesPromise;
  }

  const params = new URLSearchParams({
    state: "open",
    labels: blogPostLabel,
    sort: "created",
    direction: "desc",
    per_page: "100",
  });
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?${params}`;
  postIssuesPromise = fetch(url, { headers: githubHeaders() }).then(async (res) => {
    if (!res.ok) {
      const tokenHint = githubToken()
        ? "A token is present, but it may not have access to this repository's issues."
        : "No GitHub token was found. Set BLOG_GITHUB_TOKEN, GITHUB_TOKEN, or GH_TOKEN.";
      throw new Error(
        `Failed to fetch blog issues: ${res.status} ${res.statusText}. ${tokenHint}`
      );
    }

    const issues = (await res.json()) as GitHubIssue[];
    return issues.filter((issue) => !issue.pull_request);
  });

  return postIssuesPromise;
}

function issueToPost(issue: GitHubIssue, includeContent: boolean): PostDataType {
  const body = issue.body ?? "";
  const { content, data } = parseFrontmatter(body);
  const normalizedContent = normalizeGitHubIssueMarkdown(content);
  const slug = typeof data.slug === "string" ? data.slug : `issue-${issue.number}`;
  const title = typeof data.title === "string" ? data.title : issue.title;
  const date = data.date instanceof Date ? data.date : new Date(issue.created_at);
  const icon = typeof data.icon === "string" ? data.icon : undefined;
  const contentHtml = includeContent
    ? markdownToHtml(normalizedContent, {
        embedOrigin: "https://embed.zenn.studio",
      })
    : "";

  return {
    slug,
    title,
    date,
    icon,
    contentHtml,
    issueNumber: issue.number,
    issueUrl: issue.html_url,
  };
}

// without contentHtml
export async function getAllPostsInfo(): Promise<PostDataType[]> {
  const issues = await fetchPostIssues();
  const allPostsData = issues.map((issue) => issueToPost(issue, false));

  return allPostsData.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}

export async function getAllPostSlugs() {
  const posts = await getAllPostsInfo();

  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

export async function getPostData(slug: string): Promise<PostDataType> {
  const issues = await fetchPostIssues();
  const issue = issues.find((issue) => issueToPost(issue, false).slug === slug);

  if (!issue) {
    throw new Error(`Post not found: ${slug}`);
  }

  return issueToPost(issue, true);
}

export { blogPostLabel };
