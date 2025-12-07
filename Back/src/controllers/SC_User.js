const {DB_User} = require("../models/DB_User")
const funcoes = require("../middlewares/funcoes")
const express = require("express")
const app = express()
app.use(express.json())

class C_User {
    constructor() {
        this.__id = null
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
    async criar(req, res) {
        try {
            this.__id = funcoes.gerar_Id()

            const data = req.body
            const {email, senha, nome, classe} = data
            this.email = email
            this.senha = senha
            this.nome = nome
            this.classe = classe
            this.ativo = true
            
            await this.db.cadastrar_user(this.__id, this.email, this.senha, this.nome, this.classe, this.xp, this.nivel, this.moedas, this.ativo)

            res.send("Deu certo")
        } catch (err) {
            console.error(err)
            res.status(500).send(`Erro do tipo ${err}`)
        }
    }

    get_id() {
        return this.__id
    }
    
    async listar(req, res) {
        const resposta = await this.db.listar_user()
        res.send(resposta)
    }

    async update(req, res) {
        const data = req.body
        const {coluna, valor, id} = data
        this[coluna] = valor
        await this.db.update_user(coluna, valor, id)
        res.send(this[coluna])
    }

    async deletar(req, res) {
        const {id} = req.body
        await this.db.deletar_user(id)
        res.send("Deletado")
    }
}

module.exports = {C_User,}

/*;(async () => {
    const user = new C_User()
    console.log(user.get_id())
    user.criar("catapimbas@gmail.com", "33209", "Ralanios", "Guerreiro")
    console.log(user.get_id())
})();*/