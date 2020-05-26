 // /Users/Romaric/mongodb/bin/mongod.exe --dbpath=/Users/Romaric/mongodb-data


// Get dependencies
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
// Get our API routes
const mongodb = require('./server/mongo/config')


const api = require('./server/routes/api')
const productApi = require('./server/routes/productApi')
const ShippingDetailApi = require('./server/routes/shippingDetailApi')
const authApi = require('./server/routes/authApi')

const app = express()

app.use(express.json())
// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    // extended: false
    extended: true
}))

// Create link to Angular build directory
var distDir = __dirname + "/dist";
app.use(express.static(distDir));

const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))



/* Access Control Allow Origin */
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
  //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next()
})



// app.use(history({
//     index: '/index.html'
// }))


app.use('/api', [api, productApi, authApi, ShippingDetailApi])
//app.use(productApi)

// Initialize the app.
//var server = 



const port = process.env.PORT || 8080
app.listen(port, function () {
   // var port = server.address().port
   // var port = address().port
    console.log('App now running on port', port)
})
