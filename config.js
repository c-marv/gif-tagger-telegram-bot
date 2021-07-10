require('dotenv').config();

module.exports = {
    USE_EXPRESS: process.env.USE_EXPRESS === 'true',
    BOT_TOKEN: process.env.BOT_TOKEN,
    PORT: process.env.PORT,
    URL: process.env.URL,
    ALLOWED_USERS: process.env.ALLOWED_USERS ? process.env.ALLOWED_USERS.split(',').filter(user => user) : [],
    MONGO_DB_URI: process.env.MONGO_DB_URI,
};