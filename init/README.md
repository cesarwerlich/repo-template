# Project Name

Short description of what this project does, who it serves, and why it exists.

## Quick Start

```bash
./scripts/bootstrap.sh
./scripts/check.sh
```

If the project needs environment variables:

```bash
cp .env.example .env
```

## Project Context

Read these first:

- `CONTEXT.md` - purpose, architecture, constraints, and local commands.
- `ROADMAP.md` - current priorities and known open questions.
- `MEMORY.md` - durable project facts and repeated decisions.
- `JOURNAL.md` - chronological notes and discussion outcomes.
- `AGENTS.md` - instructions for AI coding agents.
- `CLAUDE.md` and `ANTIGRAVITY.md` - thin tool-specific wrappers that point back to `AGENTS.md`.
- `TESTING.md` - how this repo is tested and verified.
- `EVALS.md` - how quality checks, benchmarks, or evaluations are recorded.
- `docs/REFERENCE.md` - compiled questions, answers, and notable decisions for fast lookup.

## Common Commands

```bash
./scripts/bootstrap.sh  # install/setup what this repo needs
./scripts/check.sh      # run stack-aware verification
```

## Repository Layout

```text
.
  docs/           Project docs, ADRs, and runbooks
  docs/REFERENCE.md Compiled Q&A and discussion outcomes
  docs/agents/    Shared personas and playbooks for any agent tool
  scripts/        Bootstrap, checks, and project automation
  .agents/        Optional agent skills, personas, and references
  TESTING.md      Testing strategy and verification notes
  EVALS.md        Evaluation or benchmark notes, when relevant
  MEMORY.md       Durable project facts and repeated decisions
  JOURNAL.md      Chronological working log
```

Update this section as the project takes shape.
