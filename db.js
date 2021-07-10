const mongoose = require('mongoose');
const { Schema } = mongoose;

const telegramResourceSchema = new Schema({
    fileUniqueId: {
        type: String,
    },
    fileId: {
        type: String,
    },
    tags: {
        type: [String],
        index: true,
    },
    userId: {
        type: String,
        index: true,
    }
}, {
    timestamps: true,
});

module.exports.TelegramResource = mongoose.model('TelegramResource', telegramResourceSchema, 'telegram_resources');

module.exports.connect = async (uri) => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database', err);
    }
};
