const auth = require('../src/middlewares/auth.middleware');

jest.mock('../src/config', () => ({ ALLOWED_USERS: ['alice', 'bob'] }));

describe('auth.middleware', () => {
  let ctx, next;
  beforeEach(() => {
    ctx = {
      from: { username: 'alice' }
    };
    next = jest.fn();
    console.log = jest.fn();
  });

  it('calls next if user is allowed', async () => {
    await auth(ctx, next);
    expect(next).toHaveBeenCalledWith(ctx);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('logs and returns if user is not allowed', async () => {
    ctx.from.username = 'charlie';
    await auth(ctx, next);
    expect(next).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('charlie'));
  });
});
