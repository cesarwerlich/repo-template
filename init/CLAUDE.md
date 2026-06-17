# Claude Instructions

This project's agent contract is **`AGENTS.md`**. Read it first and follow it.

`CLAUDE.md` exists only so Claude-oriented tools that look for it find their way
here. It intentionally holds no separate policy — everything (session start,
multi-session coordination, safety rules, verification) lives in `AGENTS.md`.

If you use another agent tool, add a similarly thin wrapper that points to
`AGENTS.md` rather than duplicating its content.
