const { query } = require("./conecao")
/*
const {DB_User} = require("./DB_User")
const {C_User} = require("../controllers/SC_User")

const user_DB = new DB_User()
const user_C = new C_User()
*/
class DB_Conquista {
    async criar(id, id_user, titlo, descricao, preco, concluido) {
        await query("INSERT INTO Conquista (id, id_user, titlo, descricao, preco, concluido) VALUES ($1, $2, $3, $4, $5, $6)", [id, id_user, titlo, descricao, preco, concluido])
    }

    async concluir(id, id_user) {
        await query("UPDATE Conquista SET concluido = true WHERE concluido = false AND id = $1 AND id_user = $2", [id, id_user])
    }

    async get_pendentes(id) {
        const res = await query("SELECT * FROM Conquista WHERE concluido = false AND id_user = $1", [id])
        return res.rows
    }

    async get_concluidas(id) {
        const res = await query("SELECT * FROM Conquista WHERE concluido = true AND id_user = $1", [id])
        return res.rows
    }

    async deletar(id, id_user) {
        await query("DELETE FROM Conquista WHERE (concluido = false OR concluido = true) AND id = $1 AND id_user = $2 ", [id, id_user])
    }

    // --- LOJA ---
    async carregar_loja() {
        const res = await query("SELECT * FROM Conquista WHERE id_user = 'LOJA'")
        return res.rows
    }

    async criar_item_loja(id, titlo, descricao, preco) {
        await query("INSERT INTO Conquista (id, id_user, titlo, descricao, preco, concluido) VALUES ($1, 'LOJA', $2, $3, $4, false)", [id, titlo, descricao, preco])
    }

    async verificar_posse(titlo, id_user) {
        const res = await query("SELECT * FROM Conquista WHERE titlo = $1 AND id_user = $2", [titlo, id_user])
        return res.rows.length > 0
    }

    async comprar(id, id_new, id_user, titlo, descricao, preco) {
        // Cria uma cópia para o usuário
        await query("INSERT INTO Conquista (id, id_user, titlo, descricao, preco, concluido) VALUES ($1, $2, $3, $4, $5, true)", [id_new, id_user, titlo, descricao, preco])
        // Nota: Já marco como 'concluido=true' pois é um item possuído/comprado? O usuário disse: "troca a aba para mostrar conquistas realizadas". Talvez 'concluido' signifique 'adquirido' nesse contexto de loja. Vou marcar true.
    }
}

/*(async () => {
    const conq = new DB_Conquista()
    console.log(await conq.Retronar_Conquistas("055803644223482"))
})();*/
module.exports = { DB_Conquista, }