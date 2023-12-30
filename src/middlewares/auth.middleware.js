const config = require("../config");

/**
 * Middleware function to authenticate users.
 * 
 * @param {Object} ctx - The context object containing information about the user.
 * @param {Function} next - The next function to be called in the middleware chain.
 * @returns {Promise<void>} - A promise that resolves when the middleware is done.
 */
module.exports = async (ctx, next) => {
  if (!config.ALLOWED_USERS.includes(ctx.from.username)) {
    console.log(`Unauthorized access denied for ${ctx.from.username}`);
    return;
  }
  await next(ctx);
};
