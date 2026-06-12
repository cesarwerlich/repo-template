# Testing

This file describes how the generated repo should be verified.

## What Belongs Here

- unit tests
- integration tests
- end-to-end tests
- browser verification notes
- manual test plans for risky flows
- commands for local and CI verification

## Recommended Structure

```text
tests/
  unit/
  integration/
  e2e/
```

## Verification Rules

- Prefer the smallest test level that proves the behavior.
- Test behavior, not internal implementation details.
- Add a regression test before fixing a bug when practical.
- Keep test data explicit and easy to understand.
- Use browser-based verification for UI work when the repo has a browser surface.

## Minimal Test Record

```md
## What Changed

## What Was Tested

## How It Was Verified

## Remaining Risk
```

## Notes

If this repo is not software-heavy, keep this file short and use it as a living checklist rather than a heavyweight test plan.
