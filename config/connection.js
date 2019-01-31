/*
-------------------------------------------------------------------------------
Set up a connection to MySQL database and export the connection object
-------------------------------------------------------------------------------
*/

'use strict';

// require('dotenv').config();
const { Client } = require('pg');

const connection = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  // user: '<postgres>',
  // host: 'localhost',
  // database: 'burger_db',
  // password: '<password>',
  // port: 5432,
});

connection.connect();

// Export the connection
module.exports = connection;
