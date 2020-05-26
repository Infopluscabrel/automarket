const express = require('express')
const router = express.Router()

// const mongodb = require('../mongo/config')

const ShippingModel = require('../mongo/model/shipping-detail')


/*
  API for ShippingSchema Schema
  Product Create and Read all Policies API 's

*/
router.route('/shipping')

    //  Create a new ShippingDetail
    .post((req, res) => {
        const shippingDetail = new ShippingModel() // create a new instance of the Product model

        
        shippingDetail.nom = req.body.nom
        shippingDetail.numero = req.body.numero
        shippingDetail.email = req.body.email
        shippingDetail.adresse = req.body.adresse
        shippingDetail.pays = req.body.pays
        shippingDetail.bp = req.body.bp
        shippingDetail.IDproduct = req.body.IDproduct
        shippingDetail.userId = req.body.userId
        shippingDetail.shippingDate = req.body.shippingDate
        shippingDetail.totalPrice = req.body.totalPrice
  
        console.log(shippingDetail)
        // save the bear and check for errors
        shippingDetail.save(shippingDetail, (err, shippingDetail) => {
            if (err) {
                res.send(err)
            }

            // console.log('**********NEWLY CREATED SITEURL***********')
            // console.log(shippingDetail)
            res.send(shippingDetail)
        })
    })

module.exports = router
