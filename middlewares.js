const CONFIG = require('./config');
module.exports.auth = () => (
    /**
     * 
     * @param {import("telegraf").Context} ctx 
     * @param {import("express").NextFunction} next 
     */
    async (ctx, next) => {
        if (!CONFIG.ALLOWED_USERS.includes(ctx.from.username)) {
            return ctx.reply('You do not have permission to use this bot :(');
        }
        await next(ctx);
    }
)