/*
-------------------------------------------------------------------------------
Set up a connection to MySQL database and export the connection object
-------------------------------------------------------------------------------
*/

'use strict';

const mysql = require('mysql');

// Set up connection parameters
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'burgers_db'
});

// Attempt to connecto to the database
connection.connect(error => {
  if (error) {
    console.error('ERROR: Unable to make a connection' + error.stack);
    return;
  }
  
  console.log('Connected to database as ID: ' + connection.threadId);
});

// Export the connection
module.exports = connection;
