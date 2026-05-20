# Agent Skills Subsystem

This template includes an optional agent subsystem for projects that use AI coding assistants. It is copied into new repos under `init/.agents/`.

## What Is Included

```text
.agents/
  skills/       Workflow instructions for common engineering tasks
  agents/       Specialist review personas
  references/   Security, testing, accessibility, performance, and orchestration notes
```

## Operating Rule

Agents should read local project context first, then use matching skills when useful. Skills are not a replacement for understanding the codebase.

Recommended flow:

```text
Context -> Relevant skill -> Focused change -> Verification -> Memory update
```

## Skill Groups

- Define and plan: `idea-refine`, `spec-driven-development`, `planning-and-task-breakdown`
- Build: `incremental-implementation`, `test-driven-development`, `context-engineering`, `source-driven-development`
- Interfaces and UI: `api-and-interface-design`, `frontend-ui-engineering`, `browser-testing-with-devtools`
- Discovery and integration: `web-app-capability-audit`
- Verify and recover: `debugging-and-error-recovery`, `code-review-and-quality`, `code-simplification`
- Production readiness: `security-and-hardening`, `performance-optimization`, `ci-cd-and-automation`, `shipping-and-launch`
- Maintenance: `git-workflow-and-versioning`, `deprecation-and-migration`, `documentation-and-adrs`

## Personas

See [agents/README.md](agents/README.md) for persona details.

## Maintaining Skills

- Every skill lives in `skills/<name>/SKILL.md`.
- Every skill must have YAML frontmatter with `name` and `description`.
- Keep `SKILL.md` focused on workflow and exit criteria.
- Put long checklists in `references/`.
- Run `./scripts/validate-template.sh` after changing skills.

## Copy Behavior

The source folders at the repository root are copied into `init/.agents/` when the template is maintained. New repos should treat `.agents/` as optional local guidance and may delete it if they do not use AI coding agents.
