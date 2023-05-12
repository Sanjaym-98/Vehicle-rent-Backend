const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost/vehiclerenting');
    console.log('connected to mongodb')
}

module.exports = main;