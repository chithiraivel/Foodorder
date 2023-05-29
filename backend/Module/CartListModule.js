const schema = require('../CommonQuery');
const Customer_schema = new schema();

function Customer() {

    Customer.prototype.cus_Func = function (req, cbk) {
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

    Customer.prototype.View = function (req, cbk) {
        let query = 'select * from foodcart.favourite'
        Customer_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Customer.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO foodcart.favourite SET ? `
        Customer_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
                console.log(result);
            }
        });
    };

    Customer.prototype.Delete = function (req, cbk) {
        let query = `delete from foodcart.favourite where favourite_id=?`
        Customer_schema.delete(query, req.body.favourite_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Customer.prototype.update = function (req, cbk) {
      
        let favourite_id = req.body.favourite_id
        let query = `update  foodcart.favourite set ? where favourite_id=?`
        Customer_schema.update(query, [req.body, favourite_id], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Customer.prototype.Viewbyid = function (req, cbk) {
        console.log(req.body);
        let query = `select * from hotel.Customer where Customer_id=?`
        Customer_schema.viewbyid(query, req.body.Customer_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Customer;