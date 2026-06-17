# Template Playbook

Design intent for each lane. Use this to onboard contributors, brief agents, and evolve the template's goals over time.

---

## 1. Q&A / Knowledge Capture

- **Function:** Record recurring questions and their resolved answers in a searchable, persistent place.
- **Goal:** Zero re-derivation cost. Any agent or human joining mid-project finds the answer already written.
- **Why we built it:** Chat history disappears. The same questions recur across sessions, projects, and agents. Without a written record, everyone rediscovers the same traps.
- **How we built it:** `docs/memory.md` has a "Compiled Q&A" section — curated, question-keyed answers. `docs/journal.md` captures raw discussion that feeds it. Older entries rotate to `docs/history/`.
- **What we expect:** When a non-obvious question gets resolved, the answer goes into `docs/memory.md`, not just in the chat. Stale answers get updated, not left to mislead.

---

## 2. Persistent Memory / Session Log

- **Function:** Maintain durable project knowledge across session boundaries, agents, and team changes.
- **Goal:** Any agent starting a new session, or any human joining the project, orients in under 5 minutes without asking.
- **Why we built it:** AI agents lose all context when a session ends. Humans forget. Chat logs are not a reliable source of truth. The only durable record is what's written to files.
- **How we built it:** Three-layer structure — `docs/memory.md` (durable facts, traps, compiled Q&A), `docs/journal.md` (chronological working notes), `docs/history/` (archived older entries). `TASKS.md` carries the live current-state handoff.
- **What we expect:** `docs/memory.md` stays curated and small. `docs/journal.md` captures the "why" behind decisions, not execution steps — `git log` handles execution history. Entries rotate to `history/` when the journal grows long.

---

## 3. Roadmap

- **Function:** Visible record of priorities, open questions, and what's explicitly not prioritized.
- **Goal:** Any contributor knows what matters next and what's out of scope, without asking.
- **Why we built it:** Without a written roadmap, priorities live in one person's head. Agents re-derive them from context clues or invent their own, which causes drift.
- **How we built it:** `docs/roadmap.md` — a living doc of horizons and open questions. Separate from `TASKS.md` (which tracks active work) and `docs/adr/` (which records past decisions).
- **What we expect:** Roadmap stays high-level — directions and trade-offs, not tickets. `TASKS.md` carries active work. Both are updated when direction changes, not just when work completes.

---

## 4. Security

- **Function:** Baseline security policy and hardening checklist baked into every project from the first commit.
- **Goal:** Every generated repo starts with a known-safe baseline before production pressure forces shortcuts.
- **Why we built it:** Security is consistently deferred when left to "add later." Agents implement insecure defaults without explicit guidance.
- **How we built it:** `SECURITY.md` at root (GitHub surfaces it automatically as the project's security policy). `.agents/references/security-checklist.md` gives agents an actionable hardening list. `docs/operations.md` covers secrets and environment management.
- **What we expect:** Agents consult the security checklist before writing auth, file handling, or external API code. `SECURITY.md` is updated when new attack surfaces are introduced. No secrets in source — `.env.example` holds fake values only.

---

## 5. System Architecture

- **Function:** Authoritative description of how the system is shaped — services, storage, APIs, data flows, external dependencies.
- **Goal:** Every agent and human works from the same mental model. No one invents structure that already exists or contradicts what's deployed.
- **Why we built it:** Architecture lives in people's heads or in outdated diagrams. Agents make structurally wrong decisions — adding new tables, services, or APIs that duplicate existing ones — without a written record.
- **How we built it:** `CONTEXT.md` (Architecture section — quick startup read, always current). `docs/adr/` (decision records for architectural choices with context, consequences, and alternatives). `CONTEXT.md` also documents the repository layout so agents know where code, config, and secrets live.
- **What we expect:** `CONTEXT.md` updated whenever the system shape changes. ADRs written for non-obvious choices and for decisions that overrode a sensible alternative. Agents read `CONTEXT.md` at session start — it's a startup read, not an on-demand reference.

---

## 6. Deployment / VPS / Operations

- **Function:** Document how the project runs in production — deploys, rollbacks, observability, and incident response.
- **Goal:** Any agent or human can deploy, rollback, or debug in production without relying on tribal knowledge.
- **Why we built it:** Operational knowledge is the most frequently lost knowledge. Agents make dangerous assumptions about production without explicit runbooks. Incidents get worse when responders have to rediscover the system under pressure.
- **How we built it:** `docs/operations.md` (deploy steps, rollback procedure, observability); `docs/release.md` (release checklist run before every release); `docs/runbooks/` for incident-specific step-by-step procedures.
- **What we expect:** `docs/operations.md` updated whenever the deploy process changes. Release checklist run before every release. A runbook written after every significant incident. Agents never touch production infrastructure without confirming against the operations doc first.

---

## 7. GitHub Workflow / Issues

- **Function:** Standardize how work is tracked, reviewed, and merged across humans and agents.
- **Goal:** Consistent, auditable workflow where PRs have context, issues have enough detail to act on, and CI enforces a quality floor.
- **Why we built it:** Without conventions, PRs accumulate without review, issues go stale with no context, and agents open redundant or malformed issues that humans have to clean up.
- **How we built it:** `.github/workflows/` (CI and security scans). `.github/pull_request_template.md` (structured PR descriptions). `.github/ISSUE_TEMPLATE/` (bug and feature request forms). `CONTRIBUTING.md` (branching, PR, and commit conventions).
- **What we expect:** Every PR has a description. Every issue has enough context to act on without following up. CI passes before merge. Agents check open issues before starting new work to avoid duplication. Commits follow conventional format (`feat:`, `fix:`, `docs:`, etc.).

---

## 8. Worktrees / Parallel Agents

- **Function:** Allow multiple agents (or humans) to work in parallel on the same repo without stomping on each other.
- **Goal:** Parallel sessions are coordinated, not chaotic. Any session can be picked up and handed off cleanly mid-task.
- **Why we built it:** Multiple agents on the same repo without a coordination mechanism cause merge conflicts, duplicated work, and lost context. Worktrees enable branch isolation; `TASKS.md` enables session-level coordination.
- **How we built it:** `TASKS.md` Active Work table (each row keyed by task, owner, branch/worktree, and next-action). `AGENTS.md` multi-session protocol: claim a row before starting, isolate work in a named branch/worktree, update the row as you go, fill the Handoff block before stopping. Git worktrees (`git worktree add`) provide filesystem-level isolation.
- **What we expect:** Agents claim a row in `TASKS.md` before starting. They work on a dedicated branch, never directly on `main`. They update their row continuously and write a complete Handoff block before stopping. PRs are the merge gate — no direct pushes to `main`.

---

## 9. Subagents / Agent Roles

- **Function:** Define specialist agent roles that can be delegated to for specific domains — tech lead, security reviewer, frontend engineer, etc.
- **Goal:** Orchestrator agents spawn focused subagents that know their domain, reducing context bloat and improving output quality over a single generalist.
- **Why we built it:** A single agent handling everything is slower, uses more context, and produces lower-quality domain-specific output than a focused team. Specialist prompts consistently outperform generalist prompts for deep tasks.
- **How we built it:** `.agents/agents/` (specialist personas with scope and decision authority). `.agents/skills/` (workflow instructions per domain — 20+ skills covering build, review, security, shipping, etc.). `docs/agents/` (tool-neutral playbooks usable by any agent tool). Each project is expected to extend the bundled set with project-specific roles.
- **What we expect:** New projects start with the bundled agent set and extend it for their stack and team. Each persona has a clear scope and exit criteria. The default pattern: one orchestrator agent manages the task and spawns workers for specific subtasks. Subagent outputs are reviewed by the orchestrator before committing or merging.

---

## What's Still Missing / Open Questions

- **Per-project agent roster:** Each project needs to define its own tech-lead persona with project-specific context. The template provides the structure; the project fills the content.
- **Eval lane:** `docs/evals.md` exists but the lane isn't fully defined yet — when does a project need repeatable evals vs. just tests?
- **Cost tracking:** No lane yet for tracking API or infra costs across sessions, which matters for AI-heavy projects.
- **Cross-repo coordination:** Worktree coordination works within a repo; multi-repo orchestration (e.g., monorepo + separate frontend) isn't covered yet.
