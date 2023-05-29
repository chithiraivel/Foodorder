const express = require('express')
const FavList_Route = express.Router();
const fav_Func = require('../Module/FavListModule')
const FavProduct = new fav_Func();

FavList_Route.post('/FavList/:action', function (req, res) {
    FavProduct.fav_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})
module.exports = FavList_Route;