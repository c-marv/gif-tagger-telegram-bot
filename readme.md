# Gig Tagger Telegram

Simple bot for store personal gifs, attach tags to them, and using the bot as a gif searcher based on the tags.

## Requirements
- Nodejs 14.x
- NPM 7.x
- MongoDB 4.4.6
- Docker 20.10.7 (optional for development)
- docker-compose  1.29.2 (optional for development)

## DotEnv variables
- **USE_EXPRESS**: Determines if the bot will run using express or not.
- **BOT_TOKEN**: Token generated using the official telegram bot [@BotFather](https://t.me/botfather)
- **PORT**: Listen port for express. Required if `USE_EXPRESS=true`
- **URL**: Domain where is hosted the bot. Required if `USE_EXPRESS=true`
- **ALLOWED_USERS**: Usernames authorized to use the bot. Must be separated by commas (`username1,username2,username3`). If it is empty, all users are allowed to use the bot.
- **MONGO_DB_URI**: MongoDB connection url `mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]` [MongoDB Docs](https://docs.mongodb.com/manual/reference/connection-string/)

_Note_: Only for local development using mongodb docker image:
- **MONGO_DB_ROOT_USER**: Root user
- **MONGO_DB_ROOT_PASS**: Root password
- **MONGO_DB_USER**: Database owner user
- **MONGO_DB_PASSWORD**: Database owner password
- **MONGO_DB_NAME**: Database name

## Run bot 
```shell
$ cp .env.example .env # after copy fill the environment variables
$ npm install
$ npm start
```

## Run bot with docker-compose
```shell
$ cp .env.example .env # after copy fill the environment variables, including the variables for docker mongodb image
$ npm install
$ docker-compose up
```