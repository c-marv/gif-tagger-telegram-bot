const { TelegramResource } = require("../db");

const RESULT_LIMIT = 5;
/**
 * Handles the inline search query and returns matching GIFs based on tags.
 * @param {import('telegraf').Context} ctx - The context object containing information about inline query.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of GIF objects.
 */
module.exports = async (ctx) => {
  if (ctx.inlineQuery.query.length < 1) {
    return ctx.answerInlineQuery([]);
  }

  const words = ctx.inlineQuery.query.split(/\s+/);

  const currentPage = ctx.inlineQuery.offset ? parseInt(ctx.inlineQuery.offset) : 0;

  const tagsQuery = words.map(word => ({
    tags: {
      $elemMatch: {
        $regex: '^' + word,
        $options: 'i',
      }
    }
  }));

  const query = {
    userId: ctx.inlineQuery.from.id,
    $and: tagsQuery,
  };

  const result = await TelegramResource.find(query).skip(currentPage * RESULT_LIMIT).limit(RESULT_LIMIT);
  return await ctx.answerInlineQuery(result.map(item => ({
    type: 'gif',
    id: item._id,
    gif_file_id: item.fileId,
  })), {
    next_offset: (currentPage + 1),
  });
};
