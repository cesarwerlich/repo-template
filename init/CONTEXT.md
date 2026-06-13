# Context

## What This Project Is

Describe the product, service, tool, library, or research folder in plain language.

## Who It Serves

Name the primary users, operators, maintainers, or downstream systems.

## Success Criteria

- The project can be bootstrapped from a fresh checkout.
- The main verification command is documented and works.
- Important constraints and non-goals are visible before implementation starts.

## Non-Goals

- List work that is intentionally out of scope.
- List tempting directions that should not be pursued without a new decision.

## Architecture

Describe the current shape of the system. Include external services, storage, queues, APIs, UI surfaces, and deployment targets when known.

## Repository Layout

This template ships stack-neutral: it provides docs, `scripts/`, and an optional
`.agents/`, but no code or config directories. Create the homes below only when
the project actually needs them — do not pre-create empty folders.

```text
# Suggested homes (create on demand, name to fit the stack):
#   src/                 application or library code
#   src/lib/             shared internal utilities
#   tests/               unit / integration / e2e tests
#   scripts/             automation: bootstrap, check, deploy   (already present)
#   config/              non-secret, environment-specific config
#   packages/ or libs/   workspaces, if this becomes a monorepo
#   plugins/             only if this project exposes a plugin API
#   docs/                project docs and knowledge base         (already present)
#   .agents/             optional agent skills and personas      (already present)
#
# Secrets live in .env (gitignored). .env.example holds fake values only.
# Record the real layout here once it exists, and keep this section current.
```

## Local Commands

```bash
./scripts/bootstrap.sh
./scripts/check.sh
```

Add stack-specific commands once the stack is known.

## Constraints

- Security:
- Compliance/data:
- Performance:
- Cost:
- Operational:

## External Systems

| System | Purpose | Owner | Notes |
| --- | --- | --- | --- |
<!-- Add rows for each dependency as the project takes shape -->
