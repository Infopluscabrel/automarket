var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ShippingDetailSchema = new Schema({
    nom: String,
    numero: String,
    email: String,
    adresse: String,
    pays: String,
    shippingDate: String,
    IDproduct: Array,
    userId: String,
    shippingDate:Date,
    totalPrice: String
})

module.exports = mongoose.model('ShippingDetail', ShippingDetailSchema)