const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://localhost/vehiclerent');
    console.log('connected to mongodb')
}

module.exports = main;