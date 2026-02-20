const handler = require('../src/commands/on-reply-animation.command');
const db = require('../src/db');

const mockSave = jest.fn();
const fakeResource = (tags) => ({ tags, save: mockSave });

jest.mock('../src/db', () => ({
  TelegramResource: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('on-reply-animation.command', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      message: {
        reply_to_message: {
          animation: { file_unique_id: 'abc', file_id: 'fid' },
        },
        text: 'foo bar',
        from: { id: 1 },
        message_id: 99,
      },
      deleteMessage: jest.fn(),
    };
    db.TelegramResource.findOne.mockReset();
    db.TelegramResource.create.mockReset();
    mockSave.mockReset();
  });

  it('returns early if no reply_to_message', async () => {
    ctx.message.reply_to_message = null;
    await handler(ctx);
    expect(db.TelegramResource.findOne).not.toHaveBeenCalled();
  });

  it('returns early if no animation', async () => {
    ctx.message.reply_to_message.animation = null;
    await handler(ctx);
    expect(db.TelegramResource.findOne).not.toHaveBeenCalled();
  });

  it('creates a resource if not found', async () => {
    db.TelegramResource.findOne.mockResolvedValue(null);
    db.TelegramResource.create.mockResolvedValue({});
    await handler(ctx);
    expect(db.TelegramResource.create).toHaveBeenCalledWith({
      userId: 1,
      fileUniqueId: 'abc',
      fileId: 'fid',
      tags: ['foo', 'bar'],
    });
    expect(ctx.deleteMessage).toHaveBeenCalledWith(99);
  });

  it('updates and saves tags if found', async () => {
    db.TelegramResource.findOne.mockResolvedValue(fakeResource(['foo']));
    await handler(ctx);
    expect(mockSave).toHaveBeenCalled();
    expect(ctx.deleteMessage).toHaveBeenCalledWith(99);
  });
});
