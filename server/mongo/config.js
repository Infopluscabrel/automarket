const mongoose = require('mongoose')

// /Users/Romaric/mongodb/bin/mongod.exe --dbpath=/Users/Romaric/mongodb-data
//mongoose.connect('mongodb://ikismail:qwerty12@ds127362.mlab.com:27362/vue-shop', {
       

    mongoose.connect('mongodb://127.0.0.1:27017/commerce', {
        useNewUrlParser: true ,
        useCreateIndex: true,
        useFindAndModify: false
}); // connect to our database

// db.on('error', console.error.bind(console, 'connection error:'));
const db = mongoose.connection

//const db = client.db(databaseName)

db.on('error', console.error.bind(console, 'connection error:'))

module.exports = mongoose