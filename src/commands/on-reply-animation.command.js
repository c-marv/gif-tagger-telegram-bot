const { TelegramResource } = require('../db');

/**
 * Handles the command when a user replies to a message with an animation.
 * If the animation is not found in the database, it creates a new entry with the user's ID, animation details, and tags.
 * If the animation is already in the database, it adds new tags to the existing entry.
 * Deletes the user's message after processing.
 * 
 * @param {import('telegraf').Context} ctx - The context object containing information about the message and user.
 * @returns {Promise<void>} - A promise that resolves when the message is deleted.
 */
module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    return;
  }
  if (!ctx.message.reply_to_message.animation) {
    return;
  }
  let tags = [...new Set(ctx.message.text.split(/\s+/))];
  let telegramResouce = await TelegramResource.findOne({
    userId: ctx.message.from.id,
    fileUniqueId: ctx.message.reply_to_message.animation.file_unique_id
  });
  if (!telegramResouce) {
    telegramResouce = await TelegramResource.create({
      userId: ctx.message.from.id,
      fileUniqueId: ctx.message.reply_to_message.animation.file_unique_id,
      fileId: ctx.message.reply_to_message.animation.file_id,
      tags: tags,
    });
  } else {
    telegramResouce.tags = [...new Set(telegramResouce.tags.concat(tags))];
    await telegramResouce.save();
  }
  await ctx.deleteMessage(ctx.message.message_id);
}
