const { query } = require("./conecao");

class DB_User {
    async cadastrar_user(id, email, senha, nome, classe, xp, nivel, moedas, conquistas, ativo) {
        await query("INSERT INTO Usuario (id, email, senha, nome, classe, xp, nivel, moedas, conquistas, ativo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [id, email, senha, nome, classe, xp, nivel, moedas, conquistas, ativo])
    }

    async login(email, senha) {
        const res = await query("SELECT * FROM Usuario WHERE email = $1 AND senha = $2", [email, senha])
        return res.rows
    }

    async get_user(id) {
        const res = await query("SELECT * FROM Usuario WHERE ativo = true AND id = $1", [id])
        return res.rows
    }

    async update_user(coluna, novo_valor, id) {
        await query(`UPDATE Usuario SET ${coluna} = $1 WHERE id = $2`, [novo_valor, id])
    }

    async deletar_user(id, senha) {
        await query(`UPDATE Usuario SET ativo = false WHERE id = $1 AND senha = $2`, [id, senha])
    }
    /*
    async verificar_loguin(id) {
        let res = await query(`SELECT * FROM Usuario WHERE id = $1`, [id])
        return res.rows
    }
    */
    /*async buscarEmail(email) {
        let res = await query(`SELECT * FROM Usuario WHERE email = $1`, [email])
        return res.rows[0]
    }
    async buscarSenha(senha) {
        let res = await query(`SELECT * FROM Usuario WHERE senha = $1`, [senha])
        return res.rows
    }
    */

    //Para o adm 
    async listar_users() {
        const res = await query("SELECT * FROM Usuario WHERE ativo = true AND email != 'sentience@gmail.com'")
        return res.rows
    }

    async deletar_user_adm(id) {
        await query("UPDATE Usuario SET ativo = false WHERE id = $1", [id])
    }

    async adicionar_recompensa(id, xp, moedas) {
        const res = await query("UPDATE Usuario SET xp = xp + $1, moedas = moedas + $2 WHERE id = $3 RETURNING xp, nivel, moedas", [xp, moedas, id])
        return res.rows[0];
    }

    async debitar_moedas(id, valor) {
        const res = await query("UPDATE Usuario SET moedas = moedas - $1 WHERE id = $2 RETURNING moedas", [valor, id])
        return res.rows[0].moedas
    }

    async get_saldo(id) {
        const res = await query("SELECT moedas FROM Usuario WHERE id = $1", [id])
        return res.rows[0].moedas
    }

    async atualizar_nivel(id, novo_nivel) {
        await query("UPDATE Usuario SET nivel = $1 WHERE id = $2", [novo_nivel, id])
    }
}
module.exports = { DB_User, }
