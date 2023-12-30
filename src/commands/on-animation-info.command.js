const { TelegramResource } = require("../db");
const { Markup } = require('telegraf');

/**
 * Handles the on-animation-info command.
 * Retrieves the tags associated with a replied animation message and sends a reply with the tags.
 * If no tags are associated, sends a message indicating that there are no tags.
 * Deletes the original command message.
 * @param {import('telegraf').Context} ctx - The context object containing information about the command execution.
 * @returns {Promise<void>} - A promise that resolves once the command execution is complete.
 */
module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    return;
  }
  if (!ctx.message.reply_to_message.animation) {
    return;
  }
  const telegramResource = await TelegramResource.findOne({
    userId: ctx.message.from.id,
    fileUniqueId: ctx.message.reply_to_message.animation.file_unique_id,
  });
  let result = '';
  if (telegramResource.tags && telegramResource.tags.length) {
    for (const tag of telegramResource.tags) {
      result += `**${tag}**\n`;
    }
  } else {
    result = '_There are no tags associated to the animation_\n_You need to reply the animation message with the tags separated by spaces_';
  }
  await ctx.replyWithMarkdownV2(result, {
    reply_to_message_id: ctx.message.reply_to_message.message_id,
    ...Markup.inlineKeyboard([
      Markup.button.callback('Delete Message Info', 'delete_info_action'),
    ])
  });

  await ctx.deleteMessage(ctx.message.message_id);
};
