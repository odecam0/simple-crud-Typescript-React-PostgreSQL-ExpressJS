const express = require('express');
const app = express();

app.use(express.static('client/build'));
app.use(express.json());

// DB in memory for simplicity
const data = [];

app.get('/api/amount_products', (req, res) => {
    console.log("Get to /api/amount_products");
    console.log(data.length)
    res.send({'length': data.length});
})

app.post('/api/products_range', (req, res) => {
    console.log("Post to /api/products_range");

    const start = parseInt(req.body.first);
    const end = parseInt(req.body.last);
    const send_data = data.slice(start, end + 1);
    console.log(send_data)

    res.send(send_data);
})

app.post('/api/register_product', (req, res) => {
    console.log("Post to /api/register_product")

    // Index of product tha has same PID attribute
    // if -1 then no product has same PID
    let product_index =  -1;

    data.forEach((value, index, array) => {
	if (req.body.pid == value.pid) {
	    product_index = index;
	}
    })

    if (product_index != -1) {
	data[product_index] = {...data[product_index], quantity: data[product_index].quantity + 1};
    } else {
	data.push({...req.body, "quantity": 1});
    }

    console.log(data);

    res.sendStatus(200);
})

app.post('/api/update_product', (req, res) => {
    console.log("Post to /api/update_product")

    const pid_to_modify = parseInt(req.body.pid_to_modify);
    let index_to_modify = -1;

    data.forEach((p, i) => {
	if (p.pid == pid_to_modify) {
	    index_to_modify = i; 
	} 
    });

    // Is the client trying to change into existing PID?
    data.forEach((p) => {
	if (p.pid == req.body.pid && p.pid != pid_to_modify) {
	    index_to_modify = -1;
	}
    });

    if (index_to_modify != -1) {
	data[index_to_modify] = {
	    ...data[index_to_modify],
	    'pname': req.body.pname,
	    'description': req.body.description,
	    'pid': req.body.pid,
	};
	res.sendStatus(200);
    } else {
	// Could not find the PID specified to modify
	res.sendStatus(422);
    }
})

app.get('*', (req, res) => {
    res.sendFile('client/build/index.html');
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express listening to port: ${port}`)
})
