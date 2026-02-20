const handler = require('../src/commands/on-animation-info.command');
const db = require('../src/db');

jest.mock('../src/db', () => ({
  TelegramResource: { findOne: jest.fn() }
}));

describe('on-animation-info.command', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      message: {
        reply_to_message: {
          animation: { file_unique_id: '123' },
          message_id: 42
        },
        from: { id: 1 },
        message_id: 100
      },
      replyWithMarkdownV2: jest.fn(),
      deleteMessage: jest.fn(),
    };
  });

  it('replies with tags if tags are present', async () => {
    db.TelegramResource.findOne.mockResolvedValue({ tags: ['foo', 'bar'] });
    await handler(ctx);
    expect(ctx.replyWithMarkdownV2).toHaveBeenCalledWith(expect.stringContaining('**foo**'), expect.any(Object));
    expect(ctx.deleteMessage).toHaveBeenCalledWith(100);
  });

  it('replies with no tags message if no tags', async () => {
    db.TelegramResource.findOne.mockResolvedValue({ tags: [] });
    await handler(ctx);
    expect(ctx.replyWithMarkdownV2).toHaveBeenCalledWith(expect.stringContaining('_There are no tags associated'), expect.any(Object));
  });

  it('returns early if no reply_to_message', async () => {
    ctx.message.reply_to_message = null;
    await handler(ctx);
    expect(ctx.replyWithMarkdownV2).not.toHaveBeenCalled();
    expect(ctx.deleteMessage).not.toHaveBeenCalled();
  });

  it('returns early if no animation', async () => {
    ctx.message.reply_to_message.animation = null;
    await handler(ctx);
    expect(ctx.replyWithMarkdownV2).not.toHaveBeenCalled();
    expect(ctx.deleteMessage).not.toHaveBeenCalled();
  });
});
