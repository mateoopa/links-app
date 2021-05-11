const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);

pool.getConnection((err, conn) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATAABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION HAS BEEN REFUSED');
        }
    };

    if (conn) conn.release();
    console.log('DB is connected');
    return;
});

// promisify pool query
pool.query = promisify(pool.query);

module.exports = pool;
