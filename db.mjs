import postgres from 'postgres';
// postgres = require('postgres');

//export const sql = postgres("postgresql://" + process.env.DB_USER + ":" + process.env.DB_PSSWD + "@" + process.env.DB_NET + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME);
export const sql = postgres(process.env.DB_STRING);
// export const sql = postgres("postgres://odecam:sFy9avQlUOORw3xuWjMQDA06e06cbxlA@dpg-cgj0leubb6mo06ig6900-a.ohio-postgres.render.com/odecamsdb");

// export default sql;
