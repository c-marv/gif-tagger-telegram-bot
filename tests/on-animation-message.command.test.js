let mockFindOneAndUpdate;
jest.mock('../src/db', () => ({
  TelegramResource: {
    get findOneAndUpdate() { return mockFindOneAndUpdate; }
  }
}));

const handler = require('../src/commands/on-animation-message.command');

describe('on-animation-message.command', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      message: {
        animation: { file_unique_id: 'f123', file_id: 'id42' },
        from: { id: 2 },
      },
    };
    mockFindOneAndUpdate = jest.fn();
  });

  it('returns early if no animation', async () => {
    ctx.message.animation = undefined;
    await handler(ctx);
    expect(mockFindOneAndUpdate).not.toHaveBeenCalled();
  });

  it('upserts animation resource if animation exists', async () => {
    mockFindOneAndUpdate.mockResolvedValue({});
    await handler(ctx);
    expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
      { userId: 2, fileUniqueId: 'f123' },
      {
        $set: { userId: 2, fileUniqueId: 'f123', fileId: 'id42', tags: [] },
      },
      { upsert: true }
    );
  });
});
