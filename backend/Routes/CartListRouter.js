const express = require('express')
const CartList_Route = express.Router();
const cus_Func = require('../Module/CartListModule')
const CusProduct = new cus_Func();

CartList_Route.post('/CartList/:action', function (req, res) {
    CusProduct.cus_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})
module.exports = CartList_Route;