import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repo = "sugitlab/portfolio";
const label = "blog-post";
const postsDirectory = path.join(process.cwd(), "posts");
const shouldApply = process.argv.includes("--apply");

function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)/;
  const matches = frontmatterRegex.exec(fileContent);

  if (!matches) {
    return { content: fileContent, data: {} };
  }

  const frontmatterText = matches[1];
  const content = matches[2].trimStart();
  const data = {};

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

    data[key] = value;
  }

  return { content, data };
}

function sh(command, args) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function ensureLabel() {
  try {
    sh("gh", ["label", "create", label, "--repo", repo, "--color", "72D0BA", "--description", "Published blog post"]);
  } catch {
    // The label already existing is fine. Other failures will surface on issue creation.
  }
}

function getExistingIssueTitles() {
  const json = sh("gh", [
    "issue",
    "list",
    "--repo",
    repo,
    "--label",
    label,
    "--state",
    "all",
    "--limit",
    "200",
    "--json",
    "title",
  ]);

  return new Set(JSON.parse(json).map((issue) => issue.title));
}

function toIssueBody(slug, data, content) {
  const body = content.trim() || "本文は移行予定です。";
  const frontmatter = [
    "---",
    `slug: "${slug}"`,
    `title: "${data.title}"`,
    `date: "${data.date}"`,
    data.icon ? `icon: "${data.icon}"` : undefined,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  return `${frontmatter}\n\n${body}\n`;
}

if (!fs.existsSync(postsDirectory)) {
  throw new Error(`posts directory not found: ${postsDirectory}`);
}

const posts = fs
  .readdirSync(postsDirectory)
  .filter((fileName) => fileName.endsWith(".md"))
  .map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
    const { content, data } = parseFrontmatter(fileContents);

    if (!data.title || !data.date) {
      throw new Error(`Missing title or date in ${fileName}`);
    }

    return {
      slug,
      title: data.title,
      body: toIssueBody(slug, data, content),
    };
  });

console.log(`${shouldApply ? "Migrating" : "Dry run:"} ${posts.length} posts to ${repo} issues with label "${label}".`);

if (!shouldApply) {
  for (const post of posts) {
    console.log(`- ${post.title} (${post.slug})`);
  }
  console.log("Run with --apply to create issues.");
  process.exit(0);
}

ensureLabel();
const existingTitles = getExistingIssueTitles();

for (const post of posts) {
  if (existingTitles.has(post.title)) {
    console.log(`skip: ${post.title}`);
    continue;
  }

  const bodyPath = path.join(os.tmpdir(), `portfolio-post-${post.slug}.md`);
  fs.writeFileSync(bodyPath, post.body);
  sh("gh", ["issue", "create", "--repo", repo, "--title", post.title, "--body-file", bodyPath, "--label", label]);
  fs.unlinkSync(bodyPath);
  console.log(`created: ${post.title}`);
}
