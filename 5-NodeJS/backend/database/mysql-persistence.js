const mysql = require("mysql2/promise")

let config ={
  host     : 'localhost',
  user     : 'root',
  password : '153624',
  database : '1.stack'
}

//singleton
async function connect(){
    if(global.connection && !global.connection.connection._closing)
        return global.connection;

    const connection = await mysql.createConnection(config);
    global.connection = connection;
    return connection;
}

async function select(query, conn, param=null){
  const [rows] = await conn.query(query, param);
  return rows;
}

async function execute(query, conn, param){
  const result = await conn.query(query, param);
  return result[0].insertId;
}

module.exports = {
  connect,
  select,
  execute
}