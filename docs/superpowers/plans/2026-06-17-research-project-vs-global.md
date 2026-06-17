# Research: Project Level vs User Global Configuration

Synthesized from parallel GH research across 10+ public repos. Agents B and C results to be merged in.

---

## Two-Column Table (Agent A — CLAUDE.md / AGENTS.md patterns)

Sourced from: `addyosmani/agent-skills`, `shanraisshan/claude-code-best-practice`, `ruvnet/ruflo`, `NousResearch/hermes-agent`, `thedotmack/claude-mem`, `JuliusBrussee/caveman`, `gsd-build/get-shit-done`, `affaan-m/ECC`, `benhuckvale/agents-md-wizard`, `anthropics/anthropic-quickstarts`

| Belongs at PROJECT level (committed) | Belongs at USER GLOBAL (~/.claude/) |
|---|---|
| Repo name, version, package names, exact paths | Generic coding style rules (immutability, naming conventions, early returns) |
| Build/test/lint commands specific to this repo | Testing philosophy (TDD, 80% coverage) |
| Architecture description of this specific project | Security checklist (no secrets, sanitize inputs, parameterized queries) |
| Package/directory map and what each file does | Agent routing table (planner vs tdd-guide vs code-reviewer) |
| Team conventions that deviate from defaults | Agent delegation rules and parallel execution patterns |
| Tooling stack: package manager, formatter, test runner | Generic error handling mandates |
| Per-platform or per-module notes | Prompt defense baseline / anti-injection rules (unless project is security-sensitive) |
| What NOT to do for this specific repo | File and function size limits |
| Scope constraints specific to this project's design philosophy | Commit message format and PR workflow |
| CI/CD gates and scripts | Immutability mandate |
| How the project's own skill/agent/plugin system works | Global hook templates (format on save, lint on edit) |
| MCP tool names and namespaces specific to this project | Performance checklist (CWV targets, bundle budgets) |
| Contribution rubric / what gets merged / what gets rejected | Security response protocol |
| Automated maintenance tasks specific to this repo | Model selection strategy (Haiku for workers, Sonnet for main, Opus for architecture) |
| README voice/brand constraints ("caveman speak on purpose") | Code review severity levels and approval criteria |
| Skill placement policy for this project | |
| How to run the project's specific test file patterns | |

---

## Key Patterns (Agent A findings)

### 1. "Why" vs "what" split
`hermes-agent` dedicates most of AGENTS.md to *why* the project is designed the way it is — contribution rubric, design intent, "before you call it a bug" checks, the footprint ladder. These are deeply project-specific. Generic rules like "immutability" or "80% coverage" appear in project files too, but should live globally and just be referenced here.

### 2. AGENTS.md as a cross-tool compatibility layer (addyosmani pattern)
`addyosmani/agent-skills` maintains both CLAUDE.md and AGENTS.md:
- `CLAUDE.md` = Claude Code specifics (slash commands, `.claude/` paths, subagent frontmatter)
- `AGENTS.md` = universal contract covering OpenCode, Cursor, Codex, and others

This is the pattern our template already follows. Confirmed correct.

### 3. `@file` include syntax keeps AGENTS.md lean (caveman pattern)
`JuliusBrussee/caveman` uses AGENTS.md purely as an aggregator of `@include` references:
```
@./skills/caveman/SKILL.md
@./skills/caveman-commit/SKILL.md
```
No prose in AGENTS.md itself — all content lives in skill files. AGENTS.md is just a manifest. This is worth supporting in our template.

### 4. CLAUDE.md length discipline (shanraisshan finding)
`shanraisshan/claude-code-best-practice` states: **"Keep CLAUDE.md under 200 lines per file for reliable adherence."**
Also documents that `.claude/rules/*.md` with `paths:` frontmatter are **lazy-loaded** (only when Claude touches matching files), while files without frontmatter load into every session.
→ **Implication for our template:** Use `.claude/rules/` for scoped, lazy-loaded guidance. Keep AGENTS.md/CLAUDE.md always-on context short.

### 5. Behavioral rules are duplicated everywhere but shouldn't be
Almost every repo includes: "NEVER create files unless necessary", "ALWAYS read before editing", "NEVER commit secrets". These should live in `~/.claude/` globally. The duplication is intentional (insurance for new machines) but creates maintenance drift.
→ **Template opportunity:** Our template should explicitly say "these canonical rules belong globally — don't duplicate them in the project file."

### 6. Project CLAUDE.md describes the project's own agent architecture
Multiple repos use CLAUDE.md to explain how *that repo's* own agent/plugin system is structured. This is project-level: it's documentation of the repo's architecture for agents working within it.

### 7. Philosophy/attitude statements belong in the project file
Hermes's opener: "Never give up on the right solution." This sets the tone for the contribution rubric. Reflects team values for this specific codebase — unambiguously project-level.

### 8. Long mixed files are a problem
`ruflo` CLAUDE.md is 44KB+, mixing project-specific architecture with generic behavioral rules. Too long to be consistently followed. Generic rules belong globally; project-specific architecture belongs in the project file.

---

## Summary Verdict (Agent A)

**Project CLAUDE.md / AGENTS.md should answer:**
> "What is this codebase, how is it structured, what are its unique constraints and conventions, what tools does it use specifically, and what are the team's explicit design decisions?"

**Global `~/.claude/` should answer:**
> "What are my personal development principles, my default workflow, my preferred agent routing, my security checklist, and the formatting/style rules I apply everywhere regardless of project?"

**The clearest test:** If the rule would be equally valid and correct in a completely different repo with a different stack, it belongs globally. If removing it would leave an agent confused about how *this specific project* works, it belongs in the project file.

---

## Agent B Findings (pending — .claude/ directory patterns)

*To be added when Agent B completes.*

---

## Agent C Findings — Expert Repos and Anthropic Community

Sourced from: `nevir/agentfill`, `ansible/ansible`, `aio-libs/aiohttp`, `ente-io/ente`, `character-ai/larch`, `devinilabs/claude-code-init`, `VAMFI/claude-user-memory`, `TheDecipherist/claude-code-mastery`, `diminishedprime`, `StefanSko/FamilyJenga`, Anthropic issue #68872

### Official 4-Level Scope Hierarchy (confirmed from Claude Code docs)

**CLAUDE.md scopes, highest to lowest precedence:**
1. **Enterprise:** `/Library/Application Support/ClaudeCode/CLAUDE.md` — org-wide policies (rarely used publicly)
2. **Project:** `./CLAUDE.md` or `./.claude/CLAUDE.md` — team-shared, committed to source control
3. **User:** `~/.claude/CLAUDE.md` — personal defaults across all projects
4. **Local:** `./CLAUDE.local.md` — machine-local, gitignored, personal per-project overrides

**settings.json hierarchy (highest to lowest):**
1. Managed (org)
2. `.claude/settings.json` — project-shared, committed
3. `.claude/settings.local.json` — gitignored, user-specific per-project
4. `~/.claude/settings.json` — personal defaults

**Import system:** `@path/to/file.md` (including `@~/.claude/...`) loads modular files, max 5 hops. Not evaluated inside code spans.

**Nested .claude/ (v2.1.178+):** Closest-to-CWD wins on name collision. Project-scope workflow saves target the closest existing `.claude/workflows/`.

### What Global (~/.claude/CLAUDE.md) Contains (community consensus)

- Personal identity (GitHub username, SSH config, Docker auth)
- Hard security rules ("NEVER commit .env", "NEVER push to main without asking")
- Personal communication preferences (tone, response language)
- Cross-project quality gates (no secrets, test coverage minimums)
- Framework rules that apply everywhere (Node.js, Python, Next.js boilerplate)
- Personal slash commands in `~/.claude/commands/`
- MCP server configuration (Context7, playwright, etc.)
- Memory pointers: `@~/.claude/memory/memory.md`

### What Project CLAUDE.md Contains (community consensus)

- One-line project description + domain URL
- Tech stack specifics (exact framework, ORM, testing tool)
- Dev commands (`npm run dev`, `npm run build`)
- Architecture overview (directory tree, service patterns)
- Environment variable names (no values)
- Branch protection rules specific to this repo
- Commit message format for the team
- Hard "don't do" rules specific to this codebase
- Path-scoped rule imports for subdirectories

### What CLAUDE.local.md Contains (gitignored, machine-specific)

- Personal dev server ports already running locally
- Machine-specific paths
- Personal shorthand ("when I say 'ship it' I mean: lint, build, open a PR")
- Scratch output paths ("write scratch files to ~/Desktop/scratch/")

### Key Patterns from Expert Repos

**@import bridging (ansible, aiohttp, ente-io):**
Project CLAUDE.md is intentionally minimal and delegates to global:
```
@~/.claude/aio-libs/context.md          ← org-level shared context
@~/.claude/aio-libs/aiohttp/context.md  ← project-specific global preferences
@AGENTS.md                              ← shared agent definitions
@CLAUDE.local.md                        ← machine-local overrides
```
Lets maintainers keep personal workflow preferences out of the repo while having repo-level rules committed.

**Hooks vs CLAUDE.md (TheDecipherist insight — most important finding):**
> "CLAUDE.md rules are **suggestions** that Claude can override under context pressure. Hooks are **deterministic enforcement** — they always execute."
→ Safety-critical rules → hooks (exit code 2 = block). Behavioral preferences → CLAUDE.md.

**Karpathy guidelines at global level:**
The 4-rule Karpathy pattern (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution) is nearly universal — but belongs in `~/.claude/CLAUDE.md`, not duplicated per project.

**Path-scoped `.claude/rules/` (devinilabs, shanraisshan):**
Files with `paths:` frontmatter only load when Claude touches matching files. Keeps root CLAUDE.md short; puts large-codebase rules where they're relevant.

**Memory vs instructions split (Drewtopia):**
`CLAUDE.md` = pure behavior instructions. `memory/memory.md` = indexed project knowledge. Do not conflate. Our template already follows this (CONTEXT.md for facts, AGENTS.md for behavior).

### Confirmed Template Gaps

1. **No `CLAUDE.local.md.example`** — Only devinilabs ships this. It's the right pattern for machine-specific config. We should add `init/CLAUDE.local.md.example` (gitignored via `.gitignore`).
2. **4-level scope not documented** — Our template doesn't explain the official scope hierarchy to new projects. Should be in PLAYBOOK.md lane 10.
3. **`@import` pattern not mentioned** — Powerful for deferring to global rules without duplication. Should be noted in AGENTS.md and PLAYBOOK.md.
4. **Hooks vs CLAUDE.md distinction not documented** — Safety-critical rules should be hooks, not CLAUDE.md text. Our template ships `.github/workflows/` but not `.claude/hooks/` guidance.
5. **No `.claude/rules/` guidance** — Path-scoped lazy-loaded rules are a key performance pattern for large codebases. Should be mentioned in PLAYBOOK.md lane 10.

### Gaps Nobody Has Figured Out (opportunities)

- **Team global config** — No pattern for sharing a base `~/.claude/CLAUDE.md` across a team without manual sync.
- **Progressive disclosure at scale** — `.claude/rules/*.md` path-scoped pattern is underdocumented. Ours could set the standard.
- **Monorepo nested CLAUDE.md** — The v2.1.178 closest-to-CWD rule is undocumented per Anthropic issue #68872.
- **New team member bootstrap** — Most repos don't solve "here's the personal config a new contributor needs." `CLAUDE.local.md.example` is the best answer seen.
