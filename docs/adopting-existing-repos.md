# Adopting The Template In Existing Repos

Use `scripts/adopt-existing-repo.sh` when a repository already exists and you want to add the template's best-practice structure without creating conflicts.

## Default Rule

Adoption is additive and no-overwrite by default. Existing files stay authoritative.

## Usage

```bash
./scripts/adopt-existing-repo.sh /path/to/existing-repo
```

Preview without writing:

```bash
./scripts/adopt-existing-repo.sh --report-only /path/to/existing-repo
```

Profiles:

- `minimal`: core docs, agent guidance, memory, journal, roadmap, testing, evals, security, operations, support, and basic scripts.
- `github`: minimal plus GitHub issue, PR, CI, and security workflow templates when missing.
- `full`: every top-level item from `init/`, still no overwrites.

Optional:

```bash
./scripts/adopt-existing-repo.sh --with-evals-dir /path/to/existing-repo
```

This creates `evals/README.md` only when a repo needs repeatable eval datasets, fixtures, run logs, or benchmark artifacts.

## Folder Guidance

- `AGENTS.md`: canonical shared instructions for Codex, Claude, Antigravity, Copilot, and other coding agents.
- `CLAUDE.md`, `ANTIGRAVITY.md`: thin compatibility wrappers that point back to `AGENTS.md`.
- `docs/agents/`: tool-neutral playbooks, rubrics, and personas.
- `.agents/`: optional bundled skills, specialist personas, and references.
- `.claude/`: create only when the target repo needs Claude-native agents, commands, settings, or skills.
- `docs/`: recommended for durable project documentation.
- `docs/REFERENCE.md`: recommended when important questions and answers would otherwise be lost in chat or issues.
- `tests/`: create when the repo contains code and has a real test suite.
- `evals/`: create only for repeatable eval artifacts. Use `EVALS.md` for lightweight strategy notes.
- `src/`: do not create automatically. Existing repos decide their source layout.

## Manual Merge Policy

When the adoption script skips an existing file, review it manually. Do not replace mature project files with generic template files unless the owner explicitly chooses to.
