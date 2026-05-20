# Start Here

This repo is a **universal repo initializer template** — not a runtime project. You use it to create new projects, not to run a service.

## If you want to create a new project from this template

```bash
./init/scripts/new-repo.sh /path/to/new-project "Project Name"
cd /path/to/new-project
./scripts/bootstrap.sh
./scripts/check.sh
```

If the target folder already exists, `new-repo.sh` copies only missing files and leaves existing files untouched.

## If you want to maintain this template itself

1. Read `CONTEXT.md` to understand the template's own architecture.
2. Read `CONTRIBUTING.md` for change guidelines and the trimming guide.
3. Make your changes (edit `init/` for the payload, root `skills/`/`agents/`/`references/` for the agent subsystem).
4. Run `./scripts/validate-template.sh` before finishing.
5. Dry-run a new repo: `./init/scripts/new-repo.sh /tmp/test-project "Test"`

## Where to go next

| File | Purpose |
| --- | --- |
| `README.md` | Usage, design principles, full file list |
| `CONTEXT.md` | Template's own architecture and constraints |
| `CONTRIBUTING.md` | Change rules, trimming guidance, review checklist |
| `AGENTS.md` | Guidance for AI agents working on this repo |
| `AGENT-SKILLS.md` | Agent skill groups and maintenance rules |
| `JOURNAL.md` | Template maintenance history |
| `docs/adr/` | Architectural decision records |
| `init/` | The payload — this is what new projects receive |
