const { query } = require("./conecao")

class DB_Tarefa {
    async criar(id, user_id, titlo, descricao, prazo, dificuldade, tags, status) {
        await query("INSERT INTO Tarefa (id, user_id, titlo, descricao, prazo, dificuldade, tags, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [id, user_id, titlo, descricao, prazo, dificuldade, tags, status])
    }

    async get_tarefas_pendentes(id) {
        const res = await query("SELECT * FROM Tarefa WHERE user_id = $1 AND status = false", [id])
        return res.rows
    }

    async get_tarefas_concluidas(id) {
        const res = await query("SELECT * FROM Tarefa WHERE user_id = $1 AND status = true", [id])
        return res.rows
    }

    async get_tarefa(id, user_id) {
        const res = await query("SELECT * FROM Tarefa WHERE id = $1 AND user_id = $2", [id, user_id])
        return res.rows[0]
    }

    async concluir(id, user_id) {
        await query("UPDATE  Tarefa SET status = true WHERE status = false AND id = $1 AND user_id = $2", [id, user_id])
    }

    async deletar(id, user_id) {
        await query("DELETE FROM Tarefa WHERE id = $1 AND user_id = $2", [id, user_id])
    }
}

module.exports = { DB_Tarefa, }