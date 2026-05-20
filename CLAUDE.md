# Claude Instructions

This repo is a universal initializer for new repositories and work folders.

## Operating Model

- `init/` is the payload copied into new projects.
- Root-level `skills/`, `agents/`, `references/`, and `docs/` are maintained here as source material.
- New repos receive the bundled agent subsystem under `init/.agents/`.

## Working Rules

- Read `README.md` and `AGENTS.md` before making template changes.
- Read the relevant files under `init/` before changing new-project behavior.
- Use agent skills only after understanding local context.
- Keep new-project files generic, stack-aware, and safe by default.
- Do not overwrite user files in scripts unless an explicit force mode is added and documented.

## Verification

Before finishing:

```bash
./scripts/validate-template.sh
```

When changing generated-project scripts, also dry-run a new repo in a temporary folder and run:

```bash
./scripts/check.sh
```
