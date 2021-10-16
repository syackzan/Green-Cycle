const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/greenCycle-db');

module.exports = mongoose.connection;
