# AGENTS.md

Guidance for AI coding agents working on this template repository.

## Repository Purpose

This repository maintains a universal repo initializer. The copyable project payload lives in `init/`. The root-level `skills/`, `agents/`, `references/`, and `docs/` folders are source material for the optional agent subsystem included in new projects at `init/.agents/`.

## Start Here

1. Read `README.md` to understand the template layout.
2. Inspect `init/` before changing any project bootstrap behavior.
3. Use matching skills from `skills/` when the task benefits from a workflow, but gather repo context first.
4. Preserve user changes. Do not revert unrelated edits.

## Editing Rules

- Keep root docs about maintaining the template itself.
- Keep `init/` files generic and stack-neutral unless a file is explicitly stack-specific.
- Do not add project-specific names, URLs, secrets, or hardcoded package-manager assumptions to the payload.
- Prefer small shell scripts with clear output over a generator framework.
- When adding a new required payload file, update `scripts/validate-template.sh`.
- Treat `AGENTS.md` as canonical for shared instructions. Tool-specific wrappers like `CLAUDE.md` and `ANTIGRAVITY.md` should stay thin and defer back here.

## Agent Skills

Skills are workflows, not mandatory blockers. Use them when they match the work:

- New template capability or larger change: `spec-driven-development`, then `planning-and-task-breakdown`.
- Script or behavior change: `test-driven-development` where practical.
- Security, secrets, auth, or dependency policy: `security-and-hardening`.
- CI or automation: `ci-cd-and-automation`.
- Documentation structure or ADRs: `documentation-and-adrs`.
- Existing repo adoption flow: keep it additive and no-overwrite by default.

If a skill conflicts with local project instructions, local project instructions win.

## Safety Rules

- Never commit `.env`, secrets, tokens, generated credentials, or private keys.
- Ask before changing security-sensitive defaults, CI enforcement, or scripts that overwrite user files.
- Run `./scripts/validate-template.sh` before finishing template changes.
- For generated sample repos, run their `./scripts/check.sh` when relevant.

## Memory

Use `JOURNAL.md` for template-maintenance notes. New repos get their own `MEMORY.md` and should not inherit template-maintenance history.
