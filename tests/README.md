# Test Conventions - gif-tagger-telegram-bot

## Directory Structure
- All tests go in this `/tests` directory
- Name test files like `<source-file>.test.js`. (e.g. `on-animation-info.command.test.js`)

## Test Framework
- Uses [Jest](https://jestjs.io/) for unit and integration testing
- To add tests:
  - Import the handler/middleware with `require`
  - Mock Telegraf context methods/objects using Jest
  - Mock Mongoose or db dependencies using Jest's `jest.mock()`

## How to Run Tests
- Run all tests:
  ```sh
  npm test
  # or
  npx jest
  ```
- Run a single test file:
  ```sh
  npx jest tests/<file>.test.js
  ```
- Run a single test case by name:
  ```sh
  npx jest -t '<test name>'
  ```

## Example: Command Handler Test
```js
const handler = require('../src/commands/on-animation-info.command');
const db = require('../src/db');
jest.mock('../src/db', () => ({ TelegramResource: { findOne: jest.fn() } }));
describe('on-animation-info.command', () => { /* ... */ });
```

## Example: Middleware Test
```js
const auth = require('../src/middlewares/auth.middleware');
jest.mock('../src/config', () => ({ ALLOWED_USERS: ['alice', 'bob'] }));
describe('auth.middleware', () => { /* ... */ });
```

## Integration Tests (Optional)
- Integration/E2E tests can simulate update/events or HTTP (express mode)
- Use in-memory DB (e.g. [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server)) or mock DB

---
**All tests should cover:**
- Success/expected path
- Failure or early-return (invalid input/unauthorized)
- Edge/boundary cases (empty tags, missing context, etc)

PRs introducing features or fixes must add or update relevant tests.
