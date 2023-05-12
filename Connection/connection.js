const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost/vehiclerenting'); //connected to mongodb with db name as vehiclerenting
    console.log('connected to mongodb')
}

module.exports = main;