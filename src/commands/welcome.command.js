/**
 * Sends a welcome message to the user.
 * 
 * @param {Object} ctx - The context object containing information about the message.
 * @returns {Promise} - A promise that resolves when the welcome message is sent.
 */
module.exports = async (ctx) => {
  return ctx.reply(`Welcome ${ctx.from.first_name} to gif tagger bot, send me gifs :)`);
}
