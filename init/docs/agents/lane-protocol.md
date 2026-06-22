# Lane Protocol

Use this workflow whenever an agent picks up a scoped implementation lane.

## Durable surfaces

- GitHub issue: lane status, scope, acceptance criteria, and durable handoff
- Pull request: implementation diff and review discussion
- Agent chat: scratch work only

## Required workflow

1. Read the assigned issue and stay within that scope.
2. Work on an isolated branch and worktree.
3. Post an issue pickup update before editing files.
4. Open exactly one PR for the lane.
5. Post a final issue update with verification and PR link.
6. Do not merge your own PR.

## Recommended rules

- Keep `main` or the primary release branch coordinator-only.
- Default to one issue, one lane, one worktree, and one PR.
- Use stacked PRs only when one lane truly depends on another.
- List expected files in the pickup update so overlap is obvious early.
- Include exact verification commands in the final handoff.

## Lane update helper

Preview a pickup comment:

```bash
npm run lane:update -- pickup \
  --issue 17 \
  --branch codex/issue-17-lane-protocol \
  --worktree .worktrees/17-lane-protocol \
  --scope "Document the lane contract" \
  --scope "Add the agent lane issue template" \
  --expected-file docs/agents/lane-protocol.md \
  --expected-file .github/ISSUE_TEMPLATE/agent_lane.md
```

Preview a final lane update:

```bash
npm run lane:update -- final \
  --issue 17 \
  --branch codex/issue-17-lane-protocol \
  --worktree .worktrees/17-lane-protocol \
  --change "Added the lane protocol docs and worktree helper scripts" \
  --verify "./scripts/check.sh" \
  --pr 23
```
