// Optional helper — requires Node.js (>=18). Skip if your stack has no Node runtime.
import { execFileSync } from "node:child_process";
import process from "node:process";

const REPEATABLE_KEYS = new Set(["scope", "blocker", "change", "verify", "expected-file", "follow-up"]);

export function parseCliArgs(argv) {
  const [command, ...rest] = argv;
  const values = {};
  const flags = {};

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    const key = token.slice(2);
    const next = rest[index + 1];
    if (!next || next.startsWith("--")) {
      flags[key] = true;
      continue;
    }

    index += 1;
    if (key in values) {
      const current = values[key];
      values[key] = Array.isArray(current) ? [...current, next] : [current, next];
    } else if (REPEATABLE_KEYS.has(key)) {
      values[key] = [next];
    } else {
      values[key] = next;
    }
  }

  return { command, values, flags };
}

function bulletList(items, { code = false } = {}) {
  if (!items || items.length === 0) {
    return "- None.";
  }

  return items.map((item) => (code ? `- \`${item}\`` : `- ${item}`)).join("\n");
}

function ensureArray(value) {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function requireValue(values, key) {
  const value = values[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing required --${key} value.`);
  }
  return value.trim();
}

function detectRepository() {
  const remote = execFileSync("git", ["remote", "get-url", "origin"], {
    encoding: "utf8",
  }).trim();

  const match = remote.match(/github\.com[:/](.+?)(?:\.git)?$/u);
  if (!match || !match[1]) {
    throw new Error(`Could not infer GitHub repository from origin remote: ${remote}`);
  }

  return match[1];
}

export function formatLanePickupComment({
  issue,
  branch,
  worktree,
  scope = [],
  expectedFiles = [],
  blockers = [],
}) {
  return [
    `Picked up issue #${issue} on \`${branch}\`.`,
    `Worktree: \`${worktree}\``,
    "",
    "## Planned scope",
    bulletList(scope),
    "",
    "## Expected files",
    bulletList(expectedFiles, { code: true }),
    "",
    "## Early blockers / assumptions",
    bulletList(blockers.length > 0 ? blockers : ["None yet."]),
  ].join("\n");
}

export function formatLaneFinalComment({
  branch,
  worktree,
  changes = [],
  verified = [],
  pr,
  blockers = [],
  followUps = [],
}) {
  const remaining = [...blockers, ...followUps];
  return [
    `Final lane update from \`${branch}\`.`,
    `Worktree: \`${worktree}\``,
    "",
    "## What changed",
    bulletList(changes),
    "",
    "## What was verified",
    bulletList(verified),
    "",
    "## PR",
    pr ? `- #${pr}` : "- Not opened yet.",
    "",
    "## Remaining blockers / follow-ups",
    bulletList(remaining.length > 0 ? remaining : ["None."]),
  ].join("\n");
}

function buildComment(parsed) {
  if (parsed.command === "pickup") {
    return {
      issue: requireValue(parsed.values, "issue"),
      body: formatLanePickupComment({
        issue: requireValue(parsed.values, "issue"),
        branch: requireValue(parsed.values, "branch"),
        worktree: requireValue(parsed.values, "worktree"),
        scope: ensureArray(parsed.values.scope),
        expectedFiles: ensureArray(parsed.values["expected-file"]),
        blockers: ensureArray(parsed.values.blocker),
      }),
    };
  }

  if (parsed.command === "final") {
    return {
      issue: requireValue(parsed.values, "issue"),
      body: formatLaneFinalComment({
        branch: requireValue(parsed.values, "branch"),
        worktree: requireValue(parsed.values, "worktree"),
        changes: ensureArray(parsed.values.change),
        verified: ensureArray(parsed.values.verify),
        pr: parsed.values.pr,
        blockers: ensureArray(parsed.values.blocker),
        followUps: ensureArray(parsed.values["follow-up"]),
      }),
    };
  }

  throw new Error(`Unknown command: ${parsed.command ?? "(missing)"}`);
}

function printHelp() {
  process.stdout.write(`lane-update

Usage:
  node scripts/lane-update.mjs pickup --issue 17 --branch codex/issue-17-lane-protocol --worktree .worktrees/17-lane-protocol --scope "..." [--scope "..."] [--expected-file "path"] [--blocker "..."] [--post] [--repo owner/name]
  node scripts/lane-update.mjs final --issue 17 --branch codex/issue-17-lane-protocol --worktree .worktrees/17-lane-protocol --change "..." [--change "..."] [--verify "..."] [--pr 20] [--blocker "..."] [--follow-up "..."] [--post] [--repo owner/name]
`);
}

function postIssueComment({ repo, issue, body }) {
  execFileSync("gh", ["issue", "comment", issue, "--repo", repo, "--body-file", "-"], {
    input: body,
    stdio: ["pipe", "pipe", "pipe"],
    encoding: "utf8",
  });
}

function main(argv) {
  if (argv.length === 0 || argv.includes("--help")) {
    printHelp();
    return;
  }

  const parsed = parseCliArgs(argv);
  const { issue, body } = buildComment(parsed);
  process.stdout.write(`${body}\n`);

  if (parsed.flags.post) {
    const repo = typeof parsed.values.repo === "string" ? parsed.values.repo : detectRepository();
    postIssueComment({ repo, issue, body });
    process.stdout.write(`Posted comment to ${repo}#${issue}\n`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
