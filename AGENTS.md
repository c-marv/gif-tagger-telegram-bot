# AGENTS.md

---
**MAINTAIN THIS FILE:** This document provides operational and style rules for both human and autonomous agents contributing to the gif-tagger-telegram-bot codebase. Update this file anytime project conventions, tools, or structure change.
---

## 1. Overview & Purpose

This repository contains a Telegram bot for storing and tagging personal GIFs, enabling tag-based search via Telegraf on Node.js. It uses MongoDB for storage and is modularized via command and middleware handlers.

**This file standardizes agent and human contributions for maintainability, interoperability, and future-proofing.**

## 2. Requirements and Setup

- **Node.js:** 18.x or higher
- **NPM:** 10.x or higher
- **MongoDB:** 4.4.6 or higher

Install dependencies and prepare environment:
```sh
cp .env.example .env      # copy example env, then update your values
npm install               # install dependencies
```

## 3. Scripts and Running

The following `npm` scripts are defined:

| Script              | Description                           |
|---------------------|---------------------------------------|
| start:bot           | Run bot in Telegram polling mode       |
| start:express       | Run bot as an Express webhook         |
| start:azure         | Run bot as Azure Function             |
| watch:bot           | Nodemon for local dev (bot mode)      |
| watch:express       | Nodemon for Express dev               |
| watch:azure         | Watch for Azure mode                  |

Example local run:
```sh
npm run start:bot
```

**Note:**
- **Jest unit tests are now present.**
- *To add tests, place them in `/tests/` and name them `<source>.test.js` (see `/tests/README.md` for guidance). To run a single test file:*
  ```sh
  npx jest tests/<file>.test.js
  ```
- *Commit new and updated tests for all features and bugfixes. See `/tests/README.md` for conventions and mocking tips.*

## 4. Environment Variables

Copy and fill out all required keys before running. See README and below:

| Variable         | Purpose                                       |
|------------------|-----------------------------------------------|
| BOT_TOKEN        | Telegram API token from BotFather             |
| PORT             | Port for express (optional unless webhook)    |
| URL              | Public domain/webhook URL (webhook/azure only)|
| ALLOWED_USERS    | Comma list of allowed usernames (optional)    |
| MONGO_DB_URI     | MongoDB connection URI                        |

## 5. Project Structure

```txt
src/
  commands/      # Individual bot commands (handlers)
  middlewares/   # Request middlewares (auth, etc)
  db/            # Mongoose models/connectors
  config/        # Environment parsing, config modules
mongo-init.js    # MongoDB initialization (optional)
```

## 6. Code Style Guidelines

### Imports & Exports
- Use **Node.js CommonJS** (`require` / `module.exports`).
- Order: node built-ins → third-party packages → project files.
- Always use `const` for imports.

### Formatting
- 2-space indentation, trim trailing whitespace.
- Each exported function/middleware/command **must include a JSDoc block**:
  ```js
  /**
   * What it does
   * @param {import('telegraf').Context} ctx
   * @returns {Promise<void>}
   */
  ```
- Use blank lines to separate logical sections.

### Naming
- Files: `camelCase.js` or `dash-case.js` (be consistent in new files)
- Folders: all lowercase
- Variables and functions: `camelCase`

### Error Handling
- Early return for missing/invalid input:
  ```js
  if (!ctx.message.reply_to_message) return;
  ```
- Log and return (not throw) for controllable issues.
- Use `try/catch` in async code if error propagation or custom logging is desired.

### Types and Documentation
- Use JSDoc to describe all exported functions and major parameters.
- Type annotations are advisory not enforced; **no TypeScript used**.

### Modularization
- Place each command, middleware, or utility as a standalone module under its directory.

## 7. Conventions for Agents

- Validate critical config/env before running commands.
- Do not commit secrets; redact or use example values in documentation/code.
- When introducing tests or linters, add the corresponding npm scripts for discovery/autonomy.
- **Preferred locations:**
  - Tests: `/tests/`
  - Custom types (if ever needed): `/types/` or root `.d.ts`

## 8. Contribution & Review Best Practices

- Prefer meaningful, present-tense commit messages: *add welcome command*
- Keep handler functions short; refactor for testability.
- Always include or update JSDoc blocks for all exported module functions.
- Review diffs for style and environmental leaks.

## 9. Tool and Editor Support

- **No Cursor or Copilot project rules exist.**
- If introducing `.cursor/rules/` or `.github/copilot-instructions.md`, reference their key expectations here as well.
- Prefer VS Code, WebStorm, or similar JS-aware tools configured for 2-space tabs.

## 10. Example Snippets

### Proper Imports
```js
const { Telegraf } = require('telegraf');   // 3rd party
const config = require('./config');         // project/local
```

### JSDoc Example
```js
/**
 * Handles the info command
 * @param {import('telegraf').Context} ctx
 * @returns {Promise<void>}
 */
```

### Command Handler Skeleton
```js
module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) return;
  // logic here...  
};
```

### .env Example
```
BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
PORT=8080
URL=https://domain.com/bot<bot_token>
ALLOWED_USERS=user1,user2
MONGO_DB_URI=mongodb://localhost:27017/mydb
```

---

**Maintain this file! All code agents and contributors should consult and update AGENTS.md with every project process or tool change.**
