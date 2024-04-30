# Gig Tagger Telegram

Simple bot for store personal gifs, attach tags to them, and using the bot as a gif searcher based on the tags.

## Requirements
- Nodejs 18.x
- NPM 10.x
- MongoDB 4.4.6

## DotEnv variables
- **BOT_TOKEN**: Token generated using the official telegram bot [@BotFather](https://t.me/botfather)
- **PORT**: Listen port for express. Required `npm run start:express` is used.
- **URL**: Domain where is hosted the bot. Required if `npm run start:azure` or `npm run start:express` are used.
    - __azure url format:__ `https://domain.com/api/<function>`
    - __expres url format:__ `https://domain.com/bot<bot_token>`
- **ALLOWED_USERS**: Usernames authorized to use the bot. Must be separated by commas (`username1,username2,username3`). If it is empty, all users are allowed to use the bot.
- **MONGO_DB_URI**: MongoDB connection url `mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]` [MongoDB Docs](https://docs.mongodb.com/manual/reference/connection-string/)

## Run bot locally
```shell
$ cp .env.example .env # after copy fill the environment variables
$ npm install
$ npm run start:bot
```