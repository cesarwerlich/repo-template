import assert from "node:assert/strict";
import test from "node:test";

import {
  formatLanePickupComment,
  formatLaneFinalComment,
  parseCliArgs,
} from "./lane-update.mjs";

test("formatLanePickupComment renders the durable pickup update", () => {
  const comment = formatLanePickupComment({
    issue: "17",
    branch: "codex/issue-17-lane-protocol",
    worktree: ".worktrees/17-lane-protocol",
    scope: [
      "Document the lane contract.",
      "Add the agent lane issue template.",
    ],
    expectedFiles: [
      "docs/agents/lane-protocol.md",
      ".github/ISSUE_TEMPLATE/agent_lane.md",
    ],
    blockers: ["persona UUID resolver is not defined yet"],
  });

  assert.match(comment, /Picked up issue #17 on `codex\/issue-17-lane-protocol`/u);
  assert.match(comment, /Worktree: `.worktrees\/17-lane-protocol`/u);
  assert.match(comment, /## Planned scope/u);
  assert.match(comment, /## Expected files/u);
  assert.match(comment, /## Early blockers \/ assumptions/u);
  assert.match(comment, /- persona UUID resolver is not defined yet/u);
});

test("formatLaneFinalComment renders summary, verification, and PR handoff", () => {
  const comment = formatLaneFinalComment({
    branch: "codex/issue-17-lane-protocol",
    worktree: ".worktrees/17-lane-protocol",
    changes: [
      "Added lane protocol docs and worktree helper scripts.",
    ],
    verified: [
      "./scripts/validate-template.sh",
    ],
    pr: "23",
    blockers: ["live publish still depends on runtime schema visibility"],
  });

  assert.match(comment, /Final lane update from `codex\/issue-17-lane-protocol`/u);
  assert.match(comment, /Worktree: `.worktrees\/17-lane-protocol`/u);
  assert.match(comment, /## What changed/u);
  assert.match(comment, /## What was verified/u);
  assert.match(comment, /## PR/u);
  assert.match(comment, /#23/u);
  assert.match(comment, /## Remaining blockers \/ follow-ups/u);
});

test("formatLaneFinalComment handles missing PR gracefully", () => {
  const comment = formatLaneFinalComment({
    branch: "claude/issue-5-auth",
    worktree: ".worktrees/5-auth",
    changes: ["Added login endpoint"],
    verified: ["npm test"],
  });

  assert.match(comment, /- Not opened yet\./u);
});

test("parseCliArgs collects repeated flags for lane updates", () => {
  const parsed = parseCliArgs([
    "pickup",
    "--issue",
    "17",
    "--branch",
    "codex/issue-17-lane-protocol",
    "--worktree",
    ".worktrees/17-lane-protocol",
    "--scope",
    "Document the lane contract",
    "--scope",
    "Add the agent lane issue template",
    "--expected-file",
    "docs/agents/lane-protocol.md",
    "--expected-file",
    ".github/ISSUE_TEMPLATE/agent_lane.md",
    "--blocker",
    "persona UUID unresolved",
    "--post",
  ]);

  assert.equal(parsed.command, "pickup");
  assert.equal(parsed.values.issue, "17");
  assert.equal(parsed.values.branch, "codex/issue-17-lane-protocol");
  assert.deepEqual(parsed.values.scope, ["Document the lane contract", "Add the agent lane issue template"]);
  assert.deepEqual(parsed.values["expected-file"], [
    "docs/agents/lane-protocol.md",
    ".github/ISSUE_TEMPLATE/agent_lane.md",
  ]);
  assert.deepEqual(parsed.values.blocker, ["persona UUID unresolved"]);
  assert.equal(parsed.flags.post, true);
});

test("formatLanePickupComment renders early blockers with fallback when empty", () => {
  const comment = formatLanePickupComment({
    issue: "42",
    branch: "copilot/issue-42-readme-update",
    worktree: ".worktrees/42-readme-update",
    scope: ["Update README"],
    expectedFiles: ["README.md"],
  });

  assert.match(comment, /- None yet\./u);
});
