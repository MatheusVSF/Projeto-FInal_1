class User { 
    constructor({id, email, senha, nome, classe}) {
        this.id = id
        this.email = email
        this.senha = senha
        this.nome = nome
        this.classe = classe

        this.xp = 0
        this.nivel = 1
        this.moedas = 0
        this.ativo = true   
    }
}

module.exports = {User,}