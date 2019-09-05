import {createPool, Pool} from "promise-mysql";

let pool:Pool

(async ()=>{
  pool = await createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORT || '',
    database: process.env.DB_DB || 'verwaltung',
    multipleStatements: false,
    dateStrings: true,
    connectionLimit: 50
  })

  console.log("DB Pool läuft 🚀");
})()

export async function query(sql: Array<string>, noLog?:boolean):Promise<Array<Array<any>>>
export async function query(sql: string, noLog?:boolean):Promise<Array<any>> 
export async function query(sql: string | Array<string>, noLog = false):Promise<Array<any>|Array<Array<any>>> {
  if (!noLog) {
    console.log(`${sql}`)
  }

  const con = await pool.getConnection()

  let ergebnis
  if (typeof sql === 'string') {
    ergebnis = await con.query(sql)
  } else {
    con.beginTransaction()
    ergebnis = await Promise.all(sql.map(con.query))
    con.commit()
  }

  return ergebnis
}