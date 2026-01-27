const {query} = require("./conecao")
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
}

/*(async () => {
    const conq = new DB_Conquista()
    console.log(await conq.Retronar_Conquistas("055803644223482"))
})();*/
module.exports = {DB_Conquista, }