const handler = require('../src/commands/on-delete-message-info.command');

describe('on-delete-message-info.command', () => {
  it('deletes the correct message and calls next', async () => {
    const ctx = { callbackQuery: { message: { message_id: 77 } }, deleteMessage: jest.fn() };
    const next = jest.fn();
    await handler(ctx, next);
    expect(ctx.deleteMessage).toHaveBeenCalledWith(77);
    expect(next).toHaveBeenCalled();
  });
});
