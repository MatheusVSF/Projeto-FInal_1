const {DB_User} = require("../models/DB_User")
const funcoes = require("../middlewares/funcoes")
const { query } = require("../db/conDB")

class C_User {
    constructor() {
        this.id = null
        this.email = null
        this.senha = null
        this.nome = null
        this.classe = null
        this.xp = 0
        this.nivel = 1
        this.moedas = 0
        this.ativo = false

        this.db = new DB_User()
    }
    async criar (email, senha, nome, classe) {
        this.__id = funcoes.gerar_Id()
        this.email = email
        this.senha = senha
        this.nome = nome
        this.classe = classe
        this.ativo = true
        
        await this.db.cadastrar_user(this.__id, this.email, this.senha, this.nome, this.classe, this.xp, this.nivel, this.moedas, this.ativo)
    }

    get_id() {
        return this.__id
    }
    
}

module.exports = {C_User,}

/*;(async () => {
    const user = new C_User()
    console.log(user.get_id())
    user.criar("catapimbas@gmail.com", "33209", "Ralanios", "Guerreiro")
    console.log(user.get_id())
})();*/