const { Markup } = require('telegraf');
const { TelegramResource } = require('./db');
/**
 * Response with a melcome message to user
 * @param {import('telegraf').Context} ctx 
 */
module.exports.welcome = async (ctx) => {
    return ctx.reply(`Welcome ${ctx.from.first_name} to gif tagger bot, send me gifs :)`);
};

/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
module.exports.onAnimationMessage = async (ctx) => {
    if (!ctx.message.animation) {
        return await ctx.reply('no animation');
    }

    let file = await TelegramResource.findOne({
        userId: ctx.message.from.id,
        fileUniqueId: ctx.message.animation.file_unique_id
    });
    if (!file) {
        file = await TelegramResource.create({
            userId: ctx.message.from.id,
            fileUniqueId: ctx.message.animation.file_unique_id,
            fileId: ctx.message.animation.file_id,
            tags: [],
        });
    }
};

/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
module.exports.onReplyToAnimation = async (ctx) => {
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

/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
module.exports.onAnimationInfo = async (ctx) => {
    if (!ctx.message.reply_to_message) {
        return;
    }
    if (!ctx.message.reply_to_message.animation) {
        return;
    }
    let telegramResource = await TelegramResource.findOne({
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

/**
 * 
 * @param {import('telegraf').Context} ctx 
 * @param {*} next 
 */
module.exports.onDeleteAnimationInfo = async (ctx, next) => {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    next();
};

/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
module.exports.onSearch = async (ctx) => {
    if (ctx.inlineQuery.query.length < 1) {
        return ctx.answerInlineQuery([]);
    }
    let result = await TelegramResource.find({
        userId: ctx.inlineQuery.from.id,
        tags: {
            $regex: '^' + ctx.inlineQuery.query
        },
    });
    let finalResult = [];
    for (const item of result) {
        finalResult.push({
            type: 'gif',
            id: item._id,
            gif_file_id: item.fileId,
        });
    }
    return await ctx.answerInlineQuery(finalResult);
};
