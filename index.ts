import express from 'express'; // express = require('express');
const app = express();

import path from 'path';
// const path = require('path');

app.use(express.static('client/build'));
app.use(express.json());

import { Product } from './client/src/CustomTypes.js';

let { sql } = await import('./db.mjs');

// DB in memory for simplicity
const data: Product[] = [];

app.get('/api/most_in_stock', (req, res) => {
    console.log("Get to /api/most-expensive");

    const return_data = [{quantity: 0}, {quantity: 0}, {quantity: 0}];

    if (data.length === 0) {
	res.send([]);
	return;
    }

    for (let i=0; i<data.length; i++){
	if (data[i].quantity > return_data[0].quantity) {
	    return_data[2] = return_data[1];
	    return_data[1] = return_data[0];
	    return_data[0] = data[i];
	} else if (data[i].quantity > return_data[1].quantity) {
	    return_data[2] = return_data[1];
	    return_data[1] = data[i];
	} else if (data[i].quantity > return_data[2].quantity) {
	    return_data[2] = data[i]
	}
    }

    res.send(return_data)
})

app.get('/api/most_expensive', (req, res) => {
    console.log("Get to /api/most-expensive");

    const return_data = [{price: 0}, {price: 0}, {price: 0}];

    if (data.length === 0) {
	res.send([]);
	return;
    }

    for (let i=0; i<data.length; i++){
	if (data[i].price > return_data[0].price) {
	    return_data[2] = return_data[1];
	    return_data[1] = return_data[0];
	    return_data[0] = data[i];
	} else if (data[i].price > return_data[1].price) {
	    return_data[2] = return_data[1];
	    return_data[1] = data[i];
	} else if (data[i].price > return_data[2].price) {
	    return_data[2] = data[i]
	}
    }

    res.send(return_data)
})

interface return_api_amount_products {
    count: number;
}

app.get('/api/amount_products', async (req, res) => {
    console.log("Get to /api/amount_products");

    const [count] = await sql<return_api_amount_products[]>`
SELECT COUNT(pid) FROM products;
`

    res.send({'length': count.count});
})

app.post('/api/products_range', async (req, res) => {
    // SELECT
    //     *
    // FROM
    //     mytable
    // ORDER BY
    //     somefield
    // LIMIT 1 OFFSET 20;

    // This example selects the 21st row. OFFSET 20 is telling Postgres to skip the first 20 records. If you don't specify an ORDER BY
    // clause, there's no guarantee which record you will get back, which is rarely useful.

    console.log("Post to /api/products_range");

    const start = parseInt(req.body.first);
    const end = parseInt(req.body.last);
    // const send_data = data.slice(start, end + 1);

    const send_data = await sql<Product[]>`
	SELECT * FROM products
	LIMIT ${end - start} OFFSET ${start};
`
    console.log(send_data)

    res.send(send_data);
})

app.post('/api/register_product', async (req, res) => {
    console.log("Post to /api/register_product")

    // // Index of product tha has same PID attribute
    // // if -1 then no product has same PID
    // let product_index = -1;

    // // Check if there is already a product with this PID
    // // in the database
    // data.forEach((value, index, array) => {
    // 	if (req.body.pid == value.pid) {
    // 	    product_index = index;
    // 	}
    // })

    // Estou assumindo que vai retornar undefined quando não houver o tal do produto
    const [product_with_same_pid]  = await sql<Product[]>`
	SELECT pid,quantity FROM products
        WHERE pid=${parseInt(req.body.pid)};
`
    console.log(product_with_same_pid)

    // const body_data = {
    // 	...req.body,
    // 	price: parseInt(req.body.price)
    // };


    if (product_with_same_pid !== undefined) {
	// In this case, just increase its quantity.

	// UPDATE table_name
	// SET column1 = value1, column2 = value2, ...
	// WHERE condition;

	await sql`
	UPDATE products
	SET quantity=${product_with_same_pid.quantity + 1}
	WHERE pid = ${parseInt(req.body.pid)};
`;
    } else {
	// Well, if it is a new product, then we must insert it on the DB

	await sql`
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

    // // If in fact there is already a product with this PID
    // // then just increase the quantity of the product in the DB
    // // discarding the rest of the information
    // if (product_index != -1) {
    // 	data[product_index] = {
    // 	    ...data[product_index],
    // 	    quantity: data[product_index].quantity + 1
    // 	};
    // } else {
    // 	// Otherwise create a new entry in the DB with an initial
    // 	// quantity of 1
    // 	data.push({...body_data, "quantity": 1});
    // }

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
    res.sendFile(path.resolve("./client/build/index.html"));
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express listening to port: ${port}`)
})
