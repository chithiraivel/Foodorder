const schema = require('../CommonQuery');
const FavProduct_schema = new schema();

function FavProduct() {

    FavProduct.prototype.fav_Func = function (req, cbk) {
        const action = req.params.action;
        const self = this;
        console.log(action);
        switch (action) {
            case 'view':
                self.View(req, cbk)
                break;
            case 'viewbyid':
                self.Viewbyid(req, cbk)
                break;
            case 'create':
                self.Create(req, cbk)
                break;
            case 'delete':
                self.Delete(req, cbk)
                break;
            case 'update':
                self.update(req, cbk)
                break;
            default:
                cbk(Status = 'false', err = 'not uploaded')
        }
    }

    FavProduct.prototype.View = function (req, cbk) {
        let query = 'select * from foodcart.favourite_list'
        FavProduct_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    FavProduct.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO foodcart.favourite_list SET ? `
        FavProduct_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
                console.log(result);
            }
        });
    };

    FavProduct.prototype.Delete = function (req, cbk) {
        let query = `delete from foodcart.favourite_list where favourite_list=?`
        FavProduct_schema.delete(query, req.body.favourite_list, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    FavProduct.prototype.update = function (req, cbk) {
      
        let favourite_id = req.body.favourite_id
        let query = `update  foodcart.favourite set ? where favourite_id=?`
        FavProduct_schema.update(query, [req.body, favourite_id], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    FavProduct.prototype.Viewbyid = function (req, cbk) {
        console.log(req.body);
        let query = `select * from hotel.FavProduct where FavProduct_id=?`
        FavProduct_schema.viewbyid(query, req.body.FavProduct_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = FavProduct;