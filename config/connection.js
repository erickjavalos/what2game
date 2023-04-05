const mongoose = require('mongoose');
require('dotenv').config()

console.log(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/what2play')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/your-database-name');

module.exports = mongoose.connection;
