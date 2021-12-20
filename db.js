const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "castor",
    database: "product_api",
    connectionLimit: 10
})

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error("DB connection LOST!!!")
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error("DB has too many connections")
        }
        if(err.code === 'ECONNREFUSED'){
            console.error("DB connection has been refused")
        }
    }

    if(connection) connection.release();
})

module.exports = pool;