var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
    productName: String,
    productDescription: String,
    productCategory: String,
    productPriceHT: String,
    productPrice: String,
    finalSold: String,
    productImage: String,
    productSeller: String,
    isBestProduct: Boolean,
    isSold: {
        type:Boolean,
        default: false
    },
    isTopProduct: Boolean,
    productRating: Number,
    gallery1: String,
    gallery2: String,
    gallery3: String,
    gallery4: String,
    gallery5: String,
})

module.exports = mongoose.model('Product', ProductSchema)