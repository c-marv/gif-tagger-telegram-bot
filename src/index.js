require('dotenv').config();

const { Telegraf } = require('telegraf');
const express = require('express');
const config = require('./config');
const db = require('./db');
const middlewares = require('./middlewares');
const commands = require('./commands');

const bot = new Telegraf(config.BOT_TOKEN, {
  telegram: {
    webhookReply: true,
    agent: new (require('https').Agent)({
      family: 4, // Force IPv4
      timeout: 30000
    })
  }
});

db.connect(config.MONGO_DB_URI);

// Only set webhook for express/webhook mode
if (config.MODE === 'express' && config.URL) {
  bot.telegram.setWebhook(config.URL);
}

bot.use(middlewares.auth);
bot.start(commands.welcome);
bot.command('info', commands.onAnimationInfo);
bot.command('tags', commands.onTagsInfo);
bot.action('delete_message_info_action', commands.onDeleteMessageInfo);
bot.on('animation', commands.onAnimationMessage);
bot.on('inline_query', commands.onSearch);
bot.on('text', commands.onReplyToAnimation);

if (config.MODE === 'express') {
  const app = express();
  app.use(bot.webhookCallback(`/bot${config.BOT_TOKEN}`));
  app.get('/', (req, res) => {
    return res.status(200).send('⚡ gif tagger bot running in express ...');
  });
  app.listen(config.PORT, () => console.log(`Bot server running on port ${config.PORT}`));
}
if (config.MODE === 'bot') {
  bot.launch();
  console.log(`⚡ gif tagger bot running in bot mode ...`);
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

module.exports = async function (update) {
  return await bot.handleUpdate(update);
}
