# Universal Repo Init Template

Reusable starter files for new repositories and work folders. The template is intentionally stack-neutral: it gives each project a clear operating model, agent instructions, memory, security/ops docs, and lightweight scripts without assuming Node, Python, Go, Rust, or any single deployment target.

It is also tool-neutral: `AGENTS.md` is the canonical shared contract, while `CLAUDE.md` and `ANTIGRAVITY.md` are thin compatibility wrappers that point back to the shared docs.

## What Gets Copied

The `init/` directory is the payload for new projects:

```text
init/
  README.md
  CONTEXT.md       Purpose, architecture, constraints     ┐ startup
  TASKS.md         Live handoff: active work, next action  ├ reads
  DECISIONS.md     Accepted decisions still in force       ┘
  AGENTS.md        Canonical agent contract
  CLAUDE.md        Thin wrapper -> AGENTS.md
  ANTIGRAVITY.md   Thin wrapper -> AGENTS.md
  PLAYBOOK.md      Why each area exists and how to use it
  SECURITY.md  SUPPORT.md  CONTRIBUTING.md  CODEOWNERS   (kept at root for GitHub)
  .env.example  .gitignore  .editorconfig
  scripts/
    bootstrap.sh
    check.sh
    new-repo.sh
  .github/
    workflows/{ci.yml, security.yml}
    pull_request_template.md
    ISSUE_TEMPLATE/
  .agents/
    README.md         (skills/, agents/, references/ generated at create time)
  docs/
    roadmap.md  memory.md  journal.md
    testing.md  evals.md  operations.md  release.md
    adr/  history/  specs/  agents/  runbooks/  template-adoption/
```

The root `skills/`, `agents/`, and `references/` folders are the single source for the bundled agent subsystem. They are **not** committed under `init/`; instead `new-repo.sh` generates them into each new repo's `.agents/` at creation time, so there is no stored duplicate to drift. `docs/agents/` ships as a shared home for tool-neutral personas and playbooks.

## Use It

### New repository

```bash
./init/scripts/new-repo.sh /path/to/new-project "Project Name"
```

Then in the new project:

```bash
./scripts/bootstrap.sh
./scripts/check.sh
```

If the target folder already exists, `new-repo.sh` copies only missing files and leaves existing files untouched.

### Existing repository

Already have a repo and want to add the template's docs, agent guidance, and scripts without touching what's there?

```bash
# Preview what would be created — writes nothing
./scripts/adopt-existing-repo.sh --report-only /path/to/existing-repo

# Apply (additive only, never overwrites existing files)
./scripts/adopt-existing-repo.sh /path/to/existing-repo
```

Profiles: `minimal` (default, core docs + agent files), `github` (adds CI/PR templates), `full` (everything including `.agents/`).

See `docs/adopting-existing-repos.md` for what gets created, folder guidance, and conflict-safe adoption details.

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
