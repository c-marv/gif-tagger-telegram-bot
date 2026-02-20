const search = require('../src/commands/on-search.command');
const db = require('../src/db');

const fakeQuery = (results) => ({
  skip: () => ({
    limit: () => Promise.resolve(results),
  }),
});

jest.mock('../src/db', () => ({ TelegramResource: { find: jest.fn() } }));

describe('on-search.command', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      inlineQuery: {
        query: 'cat',
        from: { id: 1 },
        offset: '',
      },
      answerInlineQuery: jest.fn(),
    };
    db.TelegramResource.find.mockClear();
  });

  it('returns empty array if query is too short', async () => {
    ctx.inlineQuery.query = '';
    await search(ctx);
    expect(ctx.answerInlineQuery).toHaveBeenCalledWith([]);
    expect(db.TelegramResource.find).not.toHaveBeenCalled();
  });

  it('queries db and returns GIFs', async () => {
    db.TelegramResource.find.mockImplementation(() => fakeQuery([
      { _id: 'id1', fileId: 'a.gif' },
      { _id: 'id2', fileId: 'b.gif' },
    ]));
    await search(ctx);
    expect(db.TelegramResource.find).toHaveBeenCalled();
    expect(ctx.answerInlineQuery).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ type: 'gif', id: 'id1', gif_file_id: 'a.gif' })
      ]),
      expect.objectContaining({ next_offset: expect.any(Number) })
    );
  });
});
