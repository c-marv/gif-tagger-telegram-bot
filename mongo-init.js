db.createUser({
    user: _getEnv('MONGO_DB_USER'),
    pwd: _getEnv('MONGO_DB_PASSWORD'),
    roles: [
        {
            role: 'dbOwner',
            db: _getEnv('MONGO_DB_NAME'),
        }
    ]
});
