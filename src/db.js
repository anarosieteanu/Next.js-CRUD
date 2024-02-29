import mysql from "mysql2/promise"

export async function sql({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })

  try {
    const [results] = await dbconnection.execute(query, values)
    dbconnection.end()
    return results
  } catch (error) {
    console.log(error)
  }
}
