# Worktree Bootstrap

Use one worktree per active implementation lane.

## Create a new lane

```bash
# Default prefix is "agent" — set AGENT_TOOL to match your tool
AGENT_TOOL=claude ./scripts/worktree-bootstrap.sh 17 lane-protocol
```

This creates:

- branch: `claude/issue-17-lane-protocol`
- worktree: `.worktrees/17-lane-protocol`

Other examples:

```bash
AGENT_TOOL=codex   ./scripts/worktree-bootstrap.sh 17 lane-protocol
AGENT_TOOL=copilot ./scripts/worktree-bootstrap.sh 17 lane-protocol
```


## Recommended bootstrap flow

```bash
cd .worktrees/17-lane-protocol
./scripts/bootstrap.sh
./scripts/check.sh
```

## Cleanup

After merge:

```bash
./scripts/worktree-cleanup.sh 17-lane-protocol
```
