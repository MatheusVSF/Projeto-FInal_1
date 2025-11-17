const {query} = require("../db/conDB");

class DB_User {
    async cadastrar_user(id, email, senha, nome, classe, xp, nivel, moedas, ativo) {
        let valores = [id, email, senha, nome, classe, xp, nivel, moedas, ativo]
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

    async verificar_loguin(id) {
        let res = await query(`SELECT * FROM Usuario WHERE id = $1`, [id])
        return res.rows
    }
}
module.exports = {DB_User,}
//user.cadastrar_user("22020202020", "mvsf123@gmail.com", "2202@G", "Kururu", "Mago", 0, 1, 0, true)
;(async () => {
    //const user = new DB_User()
    //console.log(await user.listar_user())
})();