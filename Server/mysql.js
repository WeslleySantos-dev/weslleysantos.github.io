const mysql = require('mysql');

var pool = mysql.createPool({
    "database": process.env.MYSQL_DATABASE,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})
exports.pool = pool;



