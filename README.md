# Universal Repo Init Template

Reusable starter files for new repositories and work folders. The template is intentionally stack-neutral: it gives each project a clear operating model, agent instructions, memory, security/ops docs, and lightweight scripts without assuming Node, Python, Go, Rust, or any single deployment target.

## What Gets Copied

The `init/` directory is the payload for new projects:

```text
init/
  README.md
  CONTEXT.md
  AGENTS.md
  CLAUDE.md
  MEMORY.md
  ROADMAP.md
  DECISIONS.md
  SECURITY.md
  OPERATIONS.md
  CONTRIBUTING.md
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
```

The root `skills/`, `agents/`, `references/`, and `docs/` folders are source material for maintaining the bundled agent subsystem. New repos receive a copy under `init/.agents/`.

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

## Maintain It

Run validation after edits:

```bash
./scripts/validate-template.sh
```

Validation checks for unresolved placeholders, required payload files, malformed skill frontmatter, broken local markdown links, and ignored OS/secret files.

## Design Principles

- Every repo should explain what it is, how to run it, how to change it safely, and what future agents should remember.
- Agent skills are optional helpers, not a substitute for reading local project context first.
- Security, rollback, ownership, and checks belong in the first commit, not after production hurts.
- The template should stay lightweight enough to use for a scratch folder and strong enough to grow into a production service.
