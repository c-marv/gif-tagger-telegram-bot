const { TelegramResource } = require("../db");

/**
 * Handles the inline search query and returns matching GIFs based on tags.
 * @param {Object} ctx - The context object containing information about the inline query.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of GIF objects.
 */
module.exports = async (ctx) => {
  if (ctx.inlineQuery.query.length < 1) {
    return ctx.answerInlineQuery([]);
  }
  const result = await TelegramResource.find({
    userId: ctx.inlineQuery.from.id,
    tags: {
      $regex: '^' + ctx.inlineQuery.query
    },
  });
  return await ctx.answerInlineQuery(result.map(item => ({
    type: 'gif',
    id: item._id,
    gif_file_id: item.fileId,
  })));
};
