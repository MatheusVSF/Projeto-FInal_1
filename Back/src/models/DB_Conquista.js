const {query} = require("../db/conDB")
const {DB_User} = require("./DB_User")
const {C_User} = require("../controllers/SC_User")

const user_DB = new DB_User()
const user_C = new C_User()

class Conquista { 
    async criar_Conquista(valores) {
        await query("INSERT INTO Conquista (id, id_user, titlo, descricao, meta, progresso, concluido)  VALUES ($1, $2, $3, $4, $5, $6, $7)", valores)
    }

    async Concluir() {
        await query("UPADATE Conquista SET concluido = true WHERE concluido = false")
    }
}