const {query} = require("./Con_DB");

class DB_User {
    async cadastrar_user(valores) {
        await query("INSERT INTO Usuario (id, email, senha, nome, classe, xp, nivel, moedas, ativo)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", valores)
    }

    async listar_user() {
        const res = await query("SELECT * FROM Usuario WHERE ativo = true")
        return res.rows
    }

    async update_user(coluna, novo_valor, id) {
        await query(`UPDATE Usuario SET ${coluna} = $1 WHERE id = $2`, [novo_valor, id])
    }

    async deletar_user(id) {
        await query(`UPDATE Usuario SET ativo = false WHERE id = $1`, [id])
    }
}

;(async () => {
    //const user_master = new DB_User_Master() 
    //user_master.cadastrar_user(["12345678910", "matheusvitoriosfreitas@gmail.com", "22022008mV@", "Matheus", "mago", 0, 1, 0, true])
    //console.log(await user_master.listar_user())
    //await user_master.update_user("xp", 5, "12345678910")
    //await user_master.update_user("ativo", "true", "12345678910")
    //console.log(await user_master.listar_user())
    //await user_master.deletar_user("12345678910")
    //console.log(user_master.listar_user())
})();

module.exports = {DB_User,}