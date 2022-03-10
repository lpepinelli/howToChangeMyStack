import mysql from "mysql2/promise"
import config from "../config"
/*
  let config ={
    host     : '',
    user     : '',
    password : '',
    database : ''
  }
*/
declare global {
  var connection: mysql.Connection;
}

//singleton
async function connect(withTransaction: boolean){
    if(global.connection && !global.connection.connection._closing)
        return global.connection

    const connection = await mysql.createConnection(config)
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