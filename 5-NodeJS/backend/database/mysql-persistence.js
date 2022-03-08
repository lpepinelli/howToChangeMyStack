const mysql = require("mysql2/promise")
const config = require("../config")
/*
  let config ={
    host     : '',
    user     : '',
    password : '',
    database : ''
  }
*/

//singleton
async function connect(withTransaction){
    if(global.connection && !global.connection.connection._closing)
        return global.connection

    const connection = await mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      database : '1.stack',
      port     : '3306',
      password : '153624'
    })
    if(withTransaction){
      await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED')
      await connection.beginTransaction()
    }
    global.connection = connection
    return connection
}

async function select(query, conn, param=null){
  const [rows] = await conn.query(query, param)
  return rows
}

async function execute(query, conn, param){
  const result = await conn.query(query, param)
  const insertId = result[0].insertId
  const affectedRows = result[0].affectedRows
  return insertId > 0 ? insertId : affectedRows > 0 ? true : false
}

module.exports = {
  connect,
  select,
  execute
}