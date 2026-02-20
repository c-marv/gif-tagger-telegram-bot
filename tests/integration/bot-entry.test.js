jest.mock('../../src/config', () => ({ BOT_TOKEN: 'dummy', ALLOWED_USERS: ['alice'], MONGO_DB_URI: '', MODE: 'test', PORT: 3000, URL: '' }));
const app = require('../../src/index.js');
const commands = require('../../src/commands');
const db = require('../../src/db');

jest.mock('../../src/commands');
jest.mock('../../src/db');

describe('integration: bot entry', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('routes animation update to onAnimationMessage handler', async () => {
    const update = {
      message: {
        message_id: 123,
        from: { id: 1, username: 'alice' },
        animation: { file_unique_id: 'abc123' },
      },
    };
    commands.onAnimationMessage.mockResolvedValue();
    await app(update);
    expect(commands.onAnimationMessage).toHaveBeenCalled();
  });
});
