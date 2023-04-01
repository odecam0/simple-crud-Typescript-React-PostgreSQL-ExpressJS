import postgres from 'postgres';
// postgres = require('postgres');

// export const sql = postgres("postgresql://" + process.env.DB_USER + ":" + process.env.DB_PSSWD + "@" + process.env.DB_NET + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME);
export const sql = postgres(process.env.DB_STRING);

// export default sql;
