/**
 * Deletes the message containing the animation info.
 * @param {Object} ctx - The context object.
 * @param {Function} next - The next function to be called.
 * @returns {Promise<void>} - A promise that resolves when the message is deleted.
 */
module.exports = async (ctx, next) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  next();
};
