import { sql } from './db.mjs';

const result = await sql`
   CREATE TABLE products (
      pname VARCHAR(30),
      price INT,
      amount_sold INT,
      pid INT PRIMARY KEY,
      description VARCHAR(201),
      quantity INT
   );
`
