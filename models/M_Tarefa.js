class Tarefa {
    constructor(id, user_id, titlo, descricao, prazo, dificuldade, tags) {
        this.id = id, 
        this.user_id = user_id, 
        this.titlo = titlo, 
        this.descricao = descricao, 
        this.prazo = prazo, 
        this.dificuldade = dificuldade, 
        this.tags = tags || [], 
        this.status = false
    }
}

module.exports = {Tarefa, }