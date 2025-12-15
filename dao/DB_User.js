const {query} = require("./conecao");

class DB_User {
    async cadastrar_user(id, email, senha, nome, classe, xp, nivel, moedas, ativo) {
        await query("INSERT INTO Usuario (id, email, senha, nome, classe, xp, nivel, moedas, ativo)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [id, email, senha, nome, classe, xp, nivel, moedas, ativo])
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

    async buscarEmail(email) {
        let res = await query(`SELECT * FROM Usuario WHERE email = $1`, [email])
        return res.rows[0]
    }
}
module.exports = {DB_User,}
