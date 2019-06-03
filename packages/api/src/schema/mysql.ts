import { createPool } from 'promise-mysql';

const pool = createPool(eval("require('../../config.json')"))

export async function query(sql: string, uid: number = -1) {
  console.log(`${uid}: '${sql}'`)

  const connection = await pool.getConnection()
  const result = await connection.query(sql)

  connection.release()

  return result
}
