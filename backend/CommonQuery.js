const DB = require('./DB/index');

const Common = function(){
    {this.table = DB}
};

Common.prototype.Retrive = function(Query, CallBack){
    var self = this;
    self.table.query(Query, function(err, result){
        if (err){
            CallBack(err, err)
        } else {
            CallBack(false, result )
        }
    })
};

Common.prototype.create = function (Query, body, CallBack) {   
    var self = this;
    self.table.query(Query, body, function (err, result)  {
        if (err) {
            CallBack(err, err);
        } else {
            CallBack(false, result);
        }
    });
};

Common.prototype.listall = function (Query, CallBack) {
    var self = this;
    self.table.query(Query, function (err, result) {
        if (err) {
            console.log(err, 'error');
            CallBack(err, err);
        } else {
            CallBack(false, result);
        }
    });
};

Common.prototype.delete = function (Query, id, CallBack) {
    var self = this;
    self.table.query(Query, id, function (err, result) {
        if (err) {
            CallBack(err, err);

        } else {
            CallBack(false, result);
        }
    });
};

Common.prototype.update = function (Query, content, id, CallBack) {
    var self = this;
    self.table.query(Query, content, id, function (err, result) {
        if (err) {
            CallBack(err, err);
        } else {
            CallBack(false, result);
        }
    });
};

Common.prototype.listByID = function (Query, id, CallBack) {
    var self = this;
    self.table.query(Query, id, function (err, result) {
        if (err) {
            CallBack(err, err);

        } else {
            CallBack(false, result);
        }
    });
};

module.exports = Common;