import {createConnection, Connection} from "mysql2/promise"
import config from "../config"

declare global {
  var connection: Connection;
}

//? Class implementation

type persistenceDTO = {
  query: string,
  conn: Connection,
  param?: any[]
}
class MysqlPersistence{

  async connect(withTransaction: boolean){
    if(global.connection) // && !global.connection.connection._closing
        return global.connection

    const connection = await createConnection(config)
    if(withTransaction){
      await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED')
      await connection.beginTransaction()
    }
    global.connection = connection
    return connection
  }

  async select({query, conn, param}:persistenceDTO){
    const [rows] = await conn.query(query, param)
    return rows
  }

  async execute({query, conn, param}:persistenceDTO){
    const result = await conn.query(query, param) as any //! workaround
    const insertId = result[0].insertId
    const affectedRows = result[0].affectedRows
    return insertId > 0 ? insertId : affectedRows > 0 ? true : false
  }
}

export default MysqlPersistence