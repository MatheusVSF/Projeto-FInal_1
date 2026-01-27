const {query} = require("./conecao")

class DB_Tag {
    async criar (id, id_user, titlo) {
        await query("INSERT INTO Tag (id, id_user, titlo) VALUES   ($1, $2, $3)", [id, id_user, titlo])
    }

    async get_tags (id) {
        const res = await query("SELECT * FROM Tag WHERE id_user = $1", [id])
        return res.rows 
    }

    async deletar (id, id_user) {
        await query("DELETE FROM Tag WHERE id = $1 AND id_user = $2", [id, id_user])
    }

}

module.exports = {DB_Tag, }