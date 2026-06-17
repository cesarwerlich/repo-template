# Project Playbook

This file explains why each area of this repo exists, what it's for, and how to use it — for humans and AI agents alike. Read it once when you join the project. Refer back when something feels unclear.

---

## 1. Q&A / Knowledge Capture

- **What it is:** A running record of recurring questions and their resolved answers.
- **Goal:** Zero re-derivation cost. Any agent or human joining mid-project finds the answer already written — not buried in a chat log.
- **Files:** `docs/memory.md` (Compiled Q&A section) feeds from `docs/journal.md` (raw discussion notes).
- **How to use it:** When a non-obvious question gets resolved, write the answer into `docs/memory.md`. Use a question as the heading. Update stale answers instead of appending contradictory ones.
- **Why it matters:** The same questions recur across sessions, agents, and team members. Chat history disappears. This file doesn't.

---

## 2. Persistent Memory / Session Log

- **What it is:** Durable project knowledge that survives session boundaries, team changes, and context resets.
- **Goal:** Any agent starting a new session, or any human joining the project, orients in under 5 minutes.
- **Files:**
  - `docs/memory.md` — curated durable facts, traps, and compiled Q&A. Reread on demand.
  - `docs/journal.md` — chronological working notes and decision discussion. Rotated to `docs/history/` when it gets long.
  - `docs/history/` — archive of older journal entries.
  - `TASKS.md` — live current-state handoff (what's active right now, who owns it, what's next).
- **How to use it:** `docs/memory.md` is for facts worth keeping forever. `docs/journal.md` is for "we talked about X and decided Y because Z." `git log` is for "what code changed and when." Don't duplicate `git log` in the journal.
- **Why it matters:** AI agents lose all context when a session ends. The only durable record is what's written to files.

---

## 3. Roadmap

- **What it is:** A living record of priorities, open questions, and what's explicitly not being pursued right now.
- **Goal:** Any contributor knows what matters next — and what's out of scope — without asking.
- **Files:** `docs/roadmap.md`
- **How to use it:** Keep it high-level: directions, trade-offs, and open questions. Not tickets. `TASKS.md` carries active work; the roadmap carries horizon-level intent. Update it when direction changes, not just when work completes.
- **Why it matters:** Without a written roadmap, priorities live in one person's head. Agents fill the gap by inventing their own, which causes drift.

---

## 4. Security

- **What it is:** The project's security policy and a hardening checklist for agents and developers.
- **Goal:** Every feature starts from a known-safe baseline. Security is never "added later."
- **Files:**
  - `SECURITY.md` — public security policy (vulnerability reporting, scope).
  - `.agents/references/security-checklist.md` — agent-facing hardening checklist.
  - `docs/operations.md` — secrets and environment variable management.
- **How to use it:** Agents should consult the security checklist before writing auth, file handling, database queries, or external API code. `SECURITY.md` gets updated when new attack surfaces are introduced. Secrets never go in source — `.env.example` holds fake values only, `.env` is gitignored.
- **Why it matters:** Agents implement insecure defaults without explicit guidance. This checklist is that guidance.

---

## 5. System Architecture

- **What it is:** An authoritative description of how this system is shaped — services, storage, APIs, data flows, external dependencies, and repo layout.
- **Goal:** Every agent and human works from the same mental model. No one invents structure that already exists or contradicts what's deployed.
- **Files:**
  - `CONTEXT.md` — startup read. Architecture section, constraints, local commands, external systems table. Always current.
  - `docs/adr/` — architectural decision records with context, consequences, and alternatives considered.
- **How to use it:** `CONTEXT.md` is read at every session start — keep it accurate and short. ADRs are written when a non-obvious decision is made, especially one that overrides a sensible alternative. Agents check `CONTEXT.md` before proposing structural changes.
- **Why it matters:** Agents make structurally wrong decisions — adding duplicate tables, APIs, or services — when they have no written system model.

---

## 6. Deployment / VPS / Operations

- **What it is:** How this project runs in production — deploy steps, rollback procedures, observability, and incident response.
- **Goal:** Any agent or human can deploy, rollback, or debug in production without tribal knowledge.
- **Files:**
  - `docs/operations.md` — deploy steps, rollback procedure, observability setup.
  - `docs/release.md` — release checklist (run before every release).
  - `docs/runbooks/` — incident-specific step-by-step procedures.
- **How to use it:** Update `docs/operations.md` whenever the deploy process changes. Run `docs/release.md` as a checklist before every release. Write a runbook after every significant incident. Agents never touch production infrastructure without confirming against the operations doc first.
- **Why it matters:** Operational knowledge is the most frequently lost knowledge. Agents make dangerous assumptions about production without explicit runbooks.

---

## 7. GitHub Workflow / Issues

- **What it is:** Conventions for how work is tracked, reviewed, and merged — for both humans and agents.
- **Goal:** Consistent, auditable workflow. PRs have context. Issues are actionable. CI enforces a quality floor.
- **Files:**
  - `.github/workflows/` — CI and security scans.
  - `.github/pull_request_template.md` — structured PR description format.
  - `.github/ISSUE_TEMPLATE/` — bug and feature request forms.
  - `CONTRIBUTING.md` — branching, commit, and PR conventions.
- **How to use it:** Every PR gets a description. Every issue has enough context to act on without follow-up. CI must pass before merge. Agents check open issues before starting new work to avoid duplication. Commits follow conventional format: `feat:`, `fix:`, `docs:`, `chore:`, etc.
- **Why it matters:** Without conventions, PRs accumulate without review, issues go stale, and agents open redundant or malformed issues.

---

## 8. Worktrees / Parallel Agents

- **What it is:** A coordination system that lets multiple agents (or humans) work on the same repo in parallel without conflicts.
- **Goal:** Parallel sessions are coordinated, not chaotic. Any session can be picked up and handed off cleanly mid-task.
- **Files:**
  - `TASKS.md` — Active Work table (keyed by task, owner, branch/worktree, status, next-action, blockers).
  - `AGENTS.md` — multi-session coordination protocol: claim, isolate, update, hand off.
- **How to use it:**
  1. Before starting: claim a row in `TASKS.md` Active Work table. Set your branch/worktree name.
  2. While working: update your row's status and next-action as you go.
  3. Before stopping: fill the Handoff block in `TASKS.md` with current objective, definition of done, and blockers.
  4. Always work on a dedicated branch — never directly on `main`. PRs are the merge gate.
- **Why it matters:** Multiple agents on the same repo without coordination cause merge conflicts, duplicated work, and lost context. `git worktree` gives filesystem isolation; `TASKS.md` gives session-level coordination.

---

## 9. Agent Roles / Subagents

- **What it is:** Specialist agent roles that can be delegated to for specific domains — tech lead, security reviewer, backend engineer, etc.
- **Goal:** Orchestrator agents spawn focused subagents that know their domain, reducing context bloat and improving quality over a single generalist.
- **Files:**
  - `.agents/agents/` — specialist personas with scope and decision authority.
  - `.agents/skills/` — workflow instructions per domain (20+ skills: build, review, security, shipping, etc.).
  - `docs/agents/` — tool-neutral playbooks usable across agent tools.
  - `docs/agents/project-roster.md` — this project's defined agent team (fill in when setting up).
- **How to use it:** Define your project's agent team in `docs/agents/project-roster.md`. Create a persona file in `.claude/agents/<role>.md` for each role you need. The tech lead / orchestrator breaks work into tasks, assigns rows in `TASKS.md`, and reviews worker output before merging. Worker agents own their lane and hand off when done.
- **Why it matters:** A single agent handling everything uses more context and produces lower-quality output than a focused team. Specialist prompts consistently outperform generalist prompts for deep tasks.

---

## 10. Project vs Global Configuration

- **What it is:** A clear separation between what the whole team shares (committed to the repo) and what each person or agent configures for themselves (personal global settings).
- **Goal:** Team members and agents follow the same project contract without being forced into identical personal workflows.
- **Files (project level — committed, shared):**
  - `AGENTS.md` — team-shared agent contract.
  - `.claude/agents/<project-role>.md` — project-specific personas.
  - `.claude/commands/` — project-specific slash commands.
  - `.claude/settings.json` — allowed tools scoped to this repo's scripts; project-level hooks.
- **Personal (never committed — lives in `~/.claude/`):**
  - `~/.claude/CLAUDE.md` — personal coding style, language preferences, communication rules.
  - `~/.claude/agents/<generic>.md` — reusable generic personas (code-reviewer, planner, etc.) available across all projects.
  - `~/.claude/rules/` — cross-project standards (test coverage, security requirements, formatting).
  - `~/.claude/settings.json` — personal defaults (model, theme, personal tool permissions).
- **How to use it:** When you add agent guidance, ask: "does this apply to everyone on this project, or just to me?" Project-wide → commit it. Personal → put it in `~/.claude/`.
- **Why it matters:** Conflating project rules with personal preferences causes friction — either the project enforces too much (blocking personal tooling) or too little (agents behave inconsistently across team members).
