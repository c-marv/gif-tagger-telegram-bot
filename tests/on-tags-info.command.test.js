let mockAggregate;
jest.mock('../src/db', () => ({
  TelegramResource: {
    get aggregate() { return mockAggregate; }
  },
}));

const handler = require('../src/commands/on-tags-info.command');

describe('on-tags-info.command', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      replyWithMarkdownV2: jest.fn(),
      deleteMessage: jest.fn(),
      message: { message_id: 501 },
    };
    mockAggregate = jest.fn();
  });

  it('replies with tags summary and deletes the message', async () => {
    mockAggregate.mockResolvedValue([
      { _id: 'foo', counter: 3 },
      { _id: 'bar', counter: 1 },
    ]);
    await handler(ctx);
    expect(mockAggregate).toHaveBeenCalled();
    expect(ctx.replyWithMarkdownV2).toHaveBeenCalledWith(
      expect.stringContaining('*Tags Summary*'),
      expect.any(Object)
    );
    expect(ctx.deleteMessage).toHaveBeenCalledWith(501);
  });
});
