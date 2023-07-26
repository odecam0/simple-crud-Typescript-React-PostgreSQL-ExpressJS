import sql from './db.mjs';

async function insert_on_db_products(
    pname, price, amount_sold, pid, description, quantity
) {
    
    const result = sql`
	INSERT INTO products (
	    pname,
	    price,
	    amount_sold,
	    pid,
	    description,
	    quantity
	) VALUES (
	    ${pname},
	    ${price},
	    ${amount_sold},
	    ${pid},
	    ${description},
	    ${quantity}
	);
`;

    return result;
}

for (let i=1; i<= 100; i++) {
    insert_on_db_products('umnome', 1234, 2, i, 'um produto bom', 5);
}
