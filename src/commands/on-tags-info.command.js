const { TelegramResource } = require("../db");
const { Markup } = require('telegraf');


/**
 * Return a summary of all tags and the number of GIFs associated with each tag.
 * @param {import('telegraf').Context} ctx - The context object containing information about inline query.
 * @returns {Promise<String>} - A promise that resolves to a string containing the summary of tags.
 */
module.exports = async (ctx) => {
  const result = await TelegramResource.aggregate([{
    $unwind: '$tags'
  }, {
    $group: {
      _id: '$tags',
      counter: {
        $sum: 1
      }
    }
  }, {
    $sort: {
      counter: -1
    }
  }]);
  const tags = result.map(item => `*${item._id}* \\- ${item.counter}`).join("\n");
  await ctx.replyWithMarkdownV2(`*Tags Summary*\n${tags}`, {
    ...Markup.inlineKeyboard([
      Markup.button.callback('Delete Message Info', 'delete_message_info_action'),
    ]),
  });
  await ctx.deleteMessage(ctx.message.message_id);
};
