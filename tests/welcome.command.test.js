const welcome = require('../src/commands/welcome.command');

describe('welcome.command', () => {
  it('greets with the correct text', async () => {
    const ctx = { from: { first_name: 'Carl' }, reply: jest.fn() };
    await welcome(ctx);
    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining('Welcome Carl')
    );
  });
});
