const mongoose = require('mongoose');

const TelegramResourceSchema = new mongoose.Schema({
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


/**
 * Represents a Telegram resource.
 * @typedef {Object} TelegramResource
 * @property {string} _id - The unique identifier of the resource.
 * @property {string} name - The name of the resource.
 * @property {string} url - The URL of the resource.
 */
const TelegramResource = mongoose.model('TelegramResource', TelegramResourceSchema, 'telegram_resources');

/**
 * Connects to the database using the provided mongoose instance and URI.
 * 
 * @param {Object} mongoose - The mongoose instance.
 * @param {string} uri - The URI of the database.
 * @returns {Promise<void>} - A promise that resolves when the connection is successful, or rejects with an error.
 */
const connect = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database', err);
    throw err;
  }
};

module.exports = {
  TelegramResource,
  connect,
};
