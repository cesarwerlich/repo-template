# ADR 0001: Template Structure

## Status

Accepted

## Context

New projects need consistent scaffolding: documentation, CI, scripts, and optional AI agent guidance. A central template avoids rederiving this per project. The key question: how should the template be organized so source material is maintainable and the generated payload stays clean?

## Decision

1. **`init/` is the payload, root is the source.** All files copied into new projects live under `init/`. Root-level `skills/`, `agents/`, and `references/` are the canonical source for the agent subsystem; they are copied verbatim into `init/.agents/` when maintained. This prevents drift between the template's own agents and what new projects receive.

2. **Agent subsystem is optional and bundled under `.agents/`.** Skills, personas, and reference checklists ship as `.agents/` inside the payload. Projects that don't use AI coding agents can delete the directory. Projects that do can customize or extend it.

3. **Shell scripts over a generator framework.** `bootstrap.sh`, `check.sh`, and `new-repo.sh` are small, POSIX-friendly Bash scripts with no dependencies. They detect the project's stack from marker files (`package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`) rather than requiring configuration. This keeps the template zero-dependency and easy to audit.

4. **`CLAUDE.md` and `AGENTS.md` both exist.** `CLAUDE.md` is the primary instruction file for Claude-oriented tools. `AGENTS.md` is the general agent guidance. Both are payload files; `CLAUDE.md` delegates to `AGENTS.md` as the canonical source.

## Consequences

- Easier: Maintaining skills and agents in one place (root) and copying to `init/.agents/` keeps the two in sync.
- Easier: New projects start with a safety baseline (SECURITY.md, OPERATIONS.md) without any tooling dependency.
- Harder: Adding a new required payload file means updating both the `init/` tree and `scripts/validate-template.sh`.
- Constraint: `init/` must stay stack-neutral — no project-specific names, URLs, or secrets.

## Alternatives Considered

- **Generator CLI tool:** Would centralize options but adds a dependency, maintenance burden, and platform-specific behavior. Rejected in favor of auditable shell scripts.
- **Single AGENTS.md with no CLAUDE.md:** Some agent tools prefer `CLAUDE.md`. Rather than force a rename, both files exist and `CLAUDE.md` delegates.
- **Flat init/ without `.agents/` subdirectory:** Would put 22 skill files in `init/` directly. The `.agents/` namespace keeps the agent subsystem separable and deletable.
