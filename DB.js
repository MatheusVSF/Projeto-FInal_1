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
        return err
   }
}

class DB_User_Master {
    async cadastrar_usuario(valores) {
        await query("INSERT INTO Usuario (id, email, senha, nome, classe, xp, nivel, moedas)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", valores)
    }

    async listar_user() {
        const res = await query("SELECT * FROM Usuario")
        return res.rows
    }

    async update_user(coluna, novo_valor, id) {
        await query(`UPDATE Usuario SET ${coluna} = $1 WHERE id = $2`, [novo_valor, id])
    }
}

;(async () => {
    const user_master = new DB_User_Master() 
    console.log(await user_master.listar_user())
    await user_master.update_user("xp", 5, "12345678910")
    console.log(await user_master.listar_user())
})();