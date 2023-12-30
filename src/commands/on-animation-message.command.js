const { TelegramResource } = require("../db");

/**
 * Updates or inserts a Telegram resource in the database based on the received animation message.
 * @param {Object} ctx - The context object containing the received message.
 * @returns {Promise<void>} - A promise that resolves once the resource is updated or inserted.
 */
module.exports = async (ctx) => {
  if (!ctx.message.animation) {
    return;
  }

  await TelegramResource.findOneAndUpdate({
    userId: ctx.message.from.id,
    fileUniqueId: ctx.message.animation.file_unique_id
  }, {
    $set: {
      userId: ctx.message.from.id,
      fileUniqueId: ctx.message.animation.file_unique_id,
      fileId: ctx.message.animation.file_id,
      tags: [],
    }
  }, {
    upsert: true,
  });
};
