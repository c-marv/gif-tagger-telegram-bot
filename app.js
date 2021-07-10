const { Telegraf } = require('telegraf');

const express = require('express');
const CONFIG = require('./config');
const commands = require('./commands');
const middlewares = require('./middlewares');
const db = require('./db');

const app = express();
db.connect(CONFIG.MONGO_DB_URI);
const bot = new Telegraf(CONFIG.BOT_TOKEN);

if (CONFIG.USE_EXPRESS) {
    bot.telegram.setWebhook(`${CONFIG.URL}/bot${CONFIG.BOT_TOKEN}`);
    app.use(bot.webhookCallback(`/bot${CONFIG.BOT_TOKEN}`));
}
bot.use(middlewares.auth());
bot.start(commands.welcome);
bot.command('info', commands.onAnimationInfo);
bot.action('delete_info_action', commands.onDeleteAnimationInfo);
bot.on('animation', commands.onAnimationMessage);
bot.on('inline_query', commands.onSearch);
bot.on('text', commands.onReplyToAnimation);

if (CONFIG.USE_EXPRESS) {
    app.get('/', (req, res) => {
        return res.status(200).send('⚡ gif tagger bot running ...');
    });
    app.listen(CONFIG.PORT, () => console.log(`Bot server running on port ${CONFIG.PORT}`));
} else {
    bot.launch();
    console.log(`gif tagger bot running ...`);
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}
