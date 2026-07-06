const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

if (!hookUrl) {
  console.error("VERCEL_DEPLOY_HOOK_URL is not set.");
  console.error("Create a Vercel Deploy Hook and set its URL in this environment variable.");
  process.exit(1);
}

const res = await fetch(hookUrl, { method: "POST" });

if (!res.ok) {
  const body = await res.text();
  throw new Error(`Failed to trigger Vercel deploy: ${res.status} ${res.statusText}\n${body}`);
}

console.log("Triggered Vercel deploy.");
