import sql from './db.mjs';

import { Product } from './client/src/CustomTypes'

async function query_products (pid? : number ) : Promise<Product | Product[]> {
    var result : Product[] | Product;

    if (pid !== undefined) {
	[result] = await sql<Product[]>`
	    SELECT * FROM products
            WHERE pid = ${pid};
`
    } else {
	result = await sql<Product[]>`
	    SELECT * FROM products;
`
    }

    return result;
};

query_products(10).then(x => console.log(x));
query_products().then(x => console.log(x));
