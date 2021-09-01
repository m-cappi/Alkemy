var mysql = require('mysql')
var util = require('util')

var pool = mysql.createConnection({
    hots: 'localhost',
    user: 'root',
    password: '',
    database: 'fullstack_01',
    port: 3306
})

pool.query = util.promisify(pool.query);

module.exports = pool