require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI); 

mongoose.connection
    .on('open', () => console.log('connected'))
    .on('close', () => console.log('disconnected'))
    .on('error', (err) => console.log('error', err))

module.exports = mongoose;
