# Universal Repo Init Template

Reusable starter files for new repositories and work folders. The template is intentionally stack-neutral: it gives each project a clear operating model, agent instructions, memory, security/ops docs, and lightweight scripts without assuming Node, Python, Go, Rust, or any single deployment target.

It is also tool-neutral: `AGENTS.md` is the canonical shared contract, while `CLAUDE.md` and `ANTIGRAVITY.md` are thin compatibility wrappers that point back to the shared docs.

## What Gets Copied

The `init/` directory is the payload for new projects:

```text
init/
  README.md
  CONTEXT.md
  AGENTS.md
  CLAUDE.md
  ANTIGRAVITY.md
  TESTING.md
  EVALS.md
  MEMORY.md
  JOURNAL.md
  ROADMAP.md
  DECISIONS.md
  SECURITY.md
  SUPPORT.md
  OPERATIONS.md
  CONTRIBUTING.md
  CODEOWNERS
  RELEASE.md
  .env.example
  .gitignore
  .editorconfig
  scripts/
    bootstrap.sh
    check.sh
    new-repo.sh
  .github/
    workflows/
      ci.yml
      security.yml
    pull_request_template.md
    ISSUE_TEMPLATE/
  .agents/
    skills/
    agents/
    references/
  docs/
    REFERENCE.md
    agents/
```

The root `skills/`, `agents/`, `references/`, and `docs/` folders are source material for maintaining the bundled agent subsystem. New repos receive a copy under `init/.agents/`, plus a shared `docs/agents/` home for tool-neutral personas and playbooks.

## Use It

From this template directory:

```bash
./init/scripts/new-repo.sh /path/to/new-project "Project Name"
```

Then in the new project:

```bash
./scripts/bootstrap.sh
./scripts/check.sh
```

If the target folder already exists, `new-repo.sh` copies only missing files and leaves existing files untouched.

For existing repositories where you want an adoption report and a smaller default payload:

```bash
./scripts/adopt-existing-repo.sh /path/to/existing-project
```

Use `--report-only` to inspect what would be created without writing files.

See `docs/adopting-existing-repos.md` for profiles and conflict-safe adoption guidance.

## Maintain It

Run validation after edits:

```bash
./scripts/validate-template.sh
```

Validation checks for unresolved placeholders, required payload files, malformed skill frontmatter, broken local markdown links, and ignored OS/secret files.

## Design Principles

- Every repo should explain what it is, how to run it, how to change it safely, and what future agents should remember.
- Every repo benefits from separating durable memory, chronological notes, and compiled reference answers.
- Every repo should also explain how it is tested and how evaluations or benchmarks are recorded.
- Every repo should support multiple agent tools by keeping shared guidance in `AGENTS.md` and using thin adapter files for tool-specific entrypoints.
- Agent skills are optional helpers, not a substitute for reading local project context first.
- Security, rollback, ownership, and checks belong in the first commit, not after production hurts.
- The template should stay lightweight enough to use for a scratch folder and strong enough to grow into a production service.
