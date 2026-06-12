# Claude Instructions

Read `README.md` and `AGENTS.md` first. This file exists for Claude-oriented tools working on the template repository itself.

## Default Workflow

1. Ground in `CONTEXT.md` and inspect `init/` before changing generated-project behavior.
2. Keep root docs about maintaining this template.
3. Keep `init/` payload files generic, stack-neutral, and safe by default.
4. Use relevant `skills/` workflows only after understanding local context.
5. Run `./scripts/validate-template.sh` before finishing.
6. When changing generated-project scripts, dry-run a temporary generated repo and run its `./scripts/check.sh` when relevant.

## Tool Boundary

- `AGENTS.md` is the canonical shared contract.
- `CLAUDE.md` should stay thin and defer back to shared docs.
- If this repo is used with another tool, add a similarly thin wrapper rather than duplicating policy text.

## Boundaries

- Do not overwrite user work.
- Do not commit secrets.
- Do not invent missing project facts; record unknowns in `JOURNAL.md` or ask.
