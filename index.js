import express from 'express'; // express = require('express');
const app = express();
import path from 'path';
// const path = require('path');
app.use(express.static('client/build'));
app.use(express.json());
let { sql } = await import('./db.mjs');
// DB in memory for simplicity
const data = [];
app.get('/api/most_in_stock', (req, res) => {
    console.log("Get to /api/most-expensive");
    const return_data = [{ quantity: 0 }, { quantity: 0 }, { quantity: 0 }];
    if (data.length === 0) {
        res.send([]);
        return;
    }
    for (let i = 0; i < data.length; i++) {
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
app.get('/api/most_expensive', (req, res) => {
    console.log("Get to /api/most-expensive");
    const return_data = [{ price: 0 }, { price: 0 }, { price: 0 }];
    if (data.length === 0) {
        res.send([]);
        return;
    }
    for (let i = 0; i < data.length; i++) {
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
app.get('/api/amount_products', async (req, res) => {
    console.log("Get to /api/amount_products");
    const [count] = await sql `
SELECT COUNT(pid) FROM products;
`;
    res.send({ 'length': count.count });
});
app.post('/api/products_range', async (req, res) => {
    console.log("Post to /api/products_range");
    const start = parseInt(req.body.first);
    const end = parseInt(req.body.last);
    const send_data = await sql `
	SELECT * FROM products
	LIMIT ${end - start} OFFSET ${start};
`;
    console.log(send_data);
    res.send(send_data);
});
app.post('/api/register_product', async (req, res) => {
    console.log("Post to /api/register_product");
    const [product_with_same_pid] = await sql `
	SELECT pid,quantity FROM products
        WHERE pid=${parseInt(req.body.pid)};
`;
    console.log(product_with_same_pid);
    if (product_with_same_pid !== undefined) {
        // In this case, just increase its quantity.
        await sql `
	UPDATE products
	SET quantity=${product_with_same_pid.quantity + 1}
	WHERE pid = ${parseInt(req.body.pid)};
`;
    }
    else {
        // Well, if it is a new product, then we must insert it on the DB
        await sql `
	INSERT INTO products (
	    pname,
	    price,
	    amount_sold,
	    pid,
	    description,
	    quantity
	) VALUES (
	    ${req.body.pname},
	    ${parseInt(req.body.price)},
	    ${parseInt(req.body.amount_sold)},
	    ${parseInt(req.body.pid)},
	    ${req.body.description},
	    1
	);
`;
    }
    res.sendStatus(200);
});
// In this endpoint there are things that must be checked:
// 1. What if I put an PID that does not exist?
// 2. What if I select a PID that exists and try
//    to turn it into another one that exists?
app.post('/api/update_product', async (req, res) => {
    console.log("Post to /api/update_product");
    const pid_to_modify = parseInt(req.body.pid_to_modify);
    let index_to_modify = -1;
    const new_pid = parseInt(req.body.pid);
    // Check if the client is trying to change into another existing PID
    if (pid_to_modify != new_pid) {
        const [product_with_new_pid] = await sql `
            SELECT pid from products WHERE pid=${new_pid};
`;
        const [product_with_old_pid] = await sql `
	    SELECT pid from products WHERE pid=${pid_to_modify}
`;
        // In this case, there is no product with the NEW_PID
        // And there is also a product with the specified id.
        // so its ok to change previous PID to NEW_PID
        if (product_with_new_pid === undefined && product_with_old_pid !== undefined) {
            // Proceed and change the thing....
            await sql `
		UPDATE products
		    SET
			pname=${req.body.pname},
			description=${req.body.description},
			pid=${parseInt(req.body.pid)}
		WHERE pid = ${pid_to_modify};
`;
            res.sendStatus(200);
        }
        else {
            // TODO: I should send an error message, saying
            // "YOU CAN'T CHANGE PID INTO AN EXISTING PID >:("
            // or "THIS PID DOES NOT EXIST >:("
            res.sendStatus(422);
        }
    }
    // data.forEach((p) => {
    // 	if (p.pid == req.body.pid && p.pid != pid_to_modify) {
    // 	    index_to_modify = -1;
    // 	}
    // });
    // if (index_to_modify != -1) {
    // 	data[index_to_modify] = {
    // 	    ...data[index_to_modify],
    // 	    'pname': req.body.pname,
    // 	    'description': req.body.description,
    // 	    'pid': req.body.pid,
    // 	};
    // 	res.sendStatus(200);
    // } else {
    // 	// Could not find the PID specified to modify
    // 	res.sendStatus(422);
    // }
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve("./client/build/index.html"));
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express listening to port: ${port}`);
});
