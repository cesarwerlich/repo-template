# Contributing

This template should stay easy to copy, easy to audit, and hard to misuse.

## Change Guidelines

- Keep `init/` stack-neutral unless the file is explicitly an example for one stack.
- Avoid adding dependencies to the template maintenance flow.
- Keep scripts POSIX-friendly Bash where practical.
- Update `scripts/validate-template.sh` when adding required payload files.
- Preserve the optional agent subsystem, but do not let it dominate the universal init experience.

## Trimming the Template

New projects inherit scaffolding docs and skills. Most projects don't need everything. Delete these directories based on project type:

| Project Type | Delete These Skills |
| --- | --- |
| CLI / backend | `frontend-ui-engineering`, `browser-testing-with-devtools`, `web-app-capability-audit` |
| Library / SDK | `shipping-and-launch`, `frontend-ui-engineering` |
| Frontend app | Keep all or remove `api-and-interface-design` if no API |
| Scratch / spike | Remove `.agents/` entirely, keep `README.md` and `CONTEXT.md` only |

The `SECURITY.md`, `OPERATIONS.md`, and `ROADMAP.md` scaffolding files are safe to delete if the project doesn't need them. Nothing breaks.

## Review Checklist

- No unresolved `{{...}}` placeholders.
- No `.DS_Store`, `.env`, secrets, private keys, or generated credentials.
- Markdown links to local files resolve.
- Required payload files exist.
- Skill files still have `name` and `description` frontmatter.
