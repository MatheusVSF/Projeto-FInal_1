class Conquista {
    constructor(id, id_user, titlo, descricao, preco) {
        this.id = id
        this.id_user = id_user
        this.titlo = titlo
        this.descricao = descricao
        this.preco = preco
        this.concluido = false
    }
}

module.exports = {Conquista,}