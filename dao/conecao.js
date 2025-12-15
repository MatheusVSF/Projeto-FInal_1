require("dotenv").config()

const {Pool} = require("pg")

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
})

async function query(sql_comand, params) {
    try {
        const res = await pool.query(sql_comand, params)
        return res
   } catch (err) {
        console.error("ERRO NO BANCO:", err)
        throw err
   }
}

module.exports = {query}
//console.log("PGUSER:", process.env.PGUSER, typeof process.env.PGUSER)
//console.log("PGPASSWORD:", process.env.PGPASSWORD, typeof process.env.PGPASSWORD)
//console.log("PGDATABASE:", process.env.PGDATABASE)
