const {query} = require("../db/conDB")
const {DB_User} = require("./DB_User")


const user = new DB_User()

class Conquista { 
    async criar_Conquista(valores) {
        await query("INSERT INTO Conquista (id, id_user, titlo, descricao, meta, progresso, concluido)  VALUES ($1, $2, $3, $4, $5, $6, $7)", valores)
    }

    async Concluir() {
        let xp = user.xp
        const res = await query("")
    }
}