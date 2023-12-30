module.exports = {
  MODE: process.env.MODE,
  BOT_TOKEN: process.env.BOT_TOKEN,
  PORT: process.env.PORT,
  URL: process.env.URL,
  ALLOWED_USERS: process.env.ALLOWED_USERS ? process.env.ALLOWED_USERS.split(',') : [],
  MONGO_DB_URI: process.env.MONGO_DB_URI,
};
