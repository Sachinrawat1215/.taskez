const mongoose = require('mongoose');

const Connection = (URL) => {
    mongoose.connect(URL).then(() => {
        console.log('Database connected');
    }).catch((error) => {
        console.log(`Failed to connect to db reason ${error}`)
    })
};

module.exports = Connection;