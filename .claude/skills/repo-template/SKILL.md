```markdown
# repo-template Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns and conventions used in the `repo-template` TypeScript repository. You'll learn about file naming, import/export styles, commit message conventions, and how to write and organize tests. This guide also provides suggested commands to streamline your workflow.

## Coding Conventions

### File Naming
- Use **kebab-case** for all file names.
  - Example:  
    ```
    user-service.ts
    api-client.test.ts
    ```

### Import Style
- Use **relative imports** for referencing modules.
  - Example:
    ```typescript
    import { fetchData } from './utils/fetch-data';
    ```

### Export Style
- Use **named exports** instead of default exports.
  - Example:
    ```typescript
    // In user-service.ts
    export function getUser(id: string) { ... }

    // In another file
    import { getUser } from './user-service';
    ```

### Commit Message Convention
- Use **Conventional Commits** with the `feat` prefix for features.
- Keep commit messages concise (average 40 characters).
  - Example:
    ```
    feat: add user authentication middleware
    ```

## Workflows

### Creating a New Feature
**Trigger:** When adding a new feature to the codebase  
**Command:** `/new-feature`

1. Create a new TypeScript file using kebab-case.
2. Implement your feature using named exports.
3. Write tests in a corresponding `*.test.ts` file.
4. Import modules using relative paths.
5. Commit your changes with a conventional commit message:
    ```
    feat: short description of your feature
    ```

### Writing and Running Tests
**Trigger:** When verifying your code with tests  
**Command:** `/run-tests`

1. Write test files using the `*.test.ts` or `*.test.tsx` naming pattern.
2. Place tests alongside the files they test or in a dedicated `tests` directory.
3. Use the project's test runner (framework unknown; check project docs or `package.json`).
4. Run tests using the appropriate command (e.g., `npm test` or `yarn test`).

## Testing Patterns

- Test files follow the `*.test.ts` pattern.
- Place tests close to the code they test or in a `tests` directory.
- Use named exports in test files as needed.
- Example test file:
    ```typescript
    // user-service.test.ts
    import { getUser } from './user-service';

    describe('getUser', () => {
      it('returns user by id', () => {
        // test implementation
      });
    });
    ```

## Commands
| Command        | Purpose                                   |
|----------------|-------------------------------------------|
| /new-feature   | Guide for adding a new feature            |
| /run-tests     | Instructions for writing and running tests |
```
