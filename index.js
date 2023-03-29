var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('client/build'));
app.use(express.json());
// DB in memory for simplicity
var data = [];
app.get('/api/most_in_stock', function (req, res) {
    console.log("Get to /api/most-expensive");
    var return_data = [{ quantity: 0 }, { quantity: 0 }, { quantity: 0 }];
    if (data.length === 0) {
        res.send([]);
        return;
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].quantity > return_data[0].quantity) {
            return_data[2] = return_data[1];
            return_data[1] = return_data[0];
            return_data[0] = data[i];
        }
        else if (data[i].quantity > return_data[1].quantity) {
            return_data[2] = return_data[1];
            return_data[1] = data[i];
        }
        else if (data[i].quantity > return_data[2].quantity) {
            return_data[2] = data[i];
        }
    }
    res.send(return_data);
});
app.get('/api/most_expensive', function (req, res) {
    console.log("Get to /api/most-expensive");
    var return_data = [{ price: 0 }, { price: 0 }, { price: 0 }];
    if (data.length === 0) {
        res.send([]);
        return;
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].price > return_data[0].price) {
            return_data[2] = return_data[1];
            return_data[1] = return_data[0];
            return_data[0] = data[i];
        }
        else if (data[i].price > return_data[1].price) {
            return_data[2] = return_data[1];
            return_data[1] = data[i];
        }
        else if (data[i].price > return_data[2].price) {
            return_data[2] = data[i];
        }
    }
    res.send(return_data);
});
app.get('/api/amount_products', function (req, res) {
    console.log("Get to /api/amount_products");
    res.send({ 'length': data.length });
});
app.post('/api/products_range', function (req, res) {
    console.log("Post to /api/products_range");
    var start = parseInt(req.body.first);
    var end = parseInt(req.body.last);
    var send_data = data.slice(start, end + 1);
    res.send(send_data);
});
app.post('/api/register_product', function (req, res) {
    console.log("Post to /api/register_product");
    // Index of product tha has same PID attribute
    // if -1 then no product has same PID
    var product_index = -1;
    data.forEach(function (value, index, array) {
        if (req.body.pid == value.pid) {
            product_index = index;
        }
    });
    var body_data = __assign(__assign({}, req.body), { price: parseInt(req.body.price) });
    if (product_index != -1) {
        data[product_index] = __assign(__assign({}, data[product_index]), { quantity: data[product_index].quantity + 1 });
    }
    else {
        data.push(__assign(__assign({}, body_data), { "quantity": 1 }));
    }
    res.sendStatus(200);
});
app.post('/api/update_product', function (req, res) {
    console.log("Post to /api/update_product");
    var pid_to_modify = parseInt(req.body.pid_to_modify);
    var index_to_modify = -1;
    data.forEach(function (p, i) {
        if (p.pid == pid_to_modify) {
            index_to_modify = i;
        }
    });
    // Is the client trying to change into existing PID?
    data.forEach(function (p) {
        if (p.pid == req.body.pid && p.pid != pid_to_modify) {
            index_to_modify = -1;
        }
    });
    if (index_to_modify != -1) {
        data[index_to_modify] = __assign(__assign({}, data[index_to_modify]), { 'pname': req.body.pname, 'description': req.body.description, 'pid': req.body.pid });
        res.sendStatus(200);
    }
    else {
        // Could not find the PID specified to modify
        res.sendStatus(422);
    }
});
app.get('*', function (req, res) {
    res.sendFile(path.resolve("./client/build/index.html"));
});
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log("Express listening to port: ".concat(port));
});
