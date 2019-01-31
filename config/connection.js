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
});

connection.connect();

// Export the connection
module.exports = connection;
