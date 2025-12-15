class Conquista {
    constructor({id, id_user, titlo, descricao, meta}) {
        this.id = id
        this.id_user = id_user
        this.titlo = titlo
        this.descricao = descricao
        this.meta = meta
        this.progresso = 0
        this.concluido = false
    }
}

module.exports = {Conquista,}