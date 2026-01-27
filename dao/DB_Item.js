const {query} = require("./conecao")

class DB_Item {
    async criar_item(valores) {
        await query("INSERT INTO Item (id, user_id, nome, sprite, descricao, preco) VALUES ($1, $2, $3, $4, $5, $6)", valores)
    }
}

module.exports = {DB_Item, }