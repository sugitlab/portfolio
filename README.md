# Portfolio

This page has built by Next.js

## Core Libraries

- React
- Next.js
- Tailwindcss
- HeadlessUI

## Coding

### Commit Prefix

- feat
- fix
- docs
- style
- refactor
- perf
- test
- chore

## Blog Posts

Blog posts are sourced from GitHub Issues in `sugitlab/portfolio`.

- Add the `blog-post` label to publish an issue as a post.
- Set `BLOG_GITHUB_TOKEN` in build environments if the repository or issues are not publicly readable. `GITHUB_TOKEN` and `GH_TOKEN` are also supported as fallbacks.
- Put metadata at the top of the issue body.

```md
---
slug: "my-post"
title: "My Post"
date: "2026-01-01"
icon: "idea"
---

Post body in Markdown.
```

Run `npm run migrate-posts-to-issues -- --apply` to migrate local `posts/*.md` files into GitHub Issues.

### Trigger Deploy

Create a Vercel Deploy Hook:

1. Open Vercel project settings.
2. Go to `Git` > `Deploy Hooks`.
3. Create a hook for the production branch.
4. Set the hook URL as `VERCEL_DEPLOY_HOOK_URL`.

Then run:

```sh
npm run deploy:hook
```

Deploy is also triggered automatically when the `blog-post` label is added to an issue. Set `VERCEL_DEPLOY_HOOK_URL` as a GitHub Actions repository secret.
