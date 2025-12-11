const {DB_Conquista} = require("../models/DB_Conquista")
const {C_User} = require("../controllers/SC_User")
const funcoes = require("../middlewares/funcoes")
const express = require("express")
const app = express()
app.use(express.json())

class Conquista{ 
    constructor() {
        this.__id = null
        this.__id_User = null
        this.titlo = null
        this.descricao = null
        this.meta = null
        this.progresso = null
        this.concluido = false

        this.db = new DB_Conquista()
    }

    async criar(req, res) {
        try {
            this.__id = funcoes.gerar_Id()
            this.__id_User = C_User.get_id()
            const data = req.body
            const {titlo, descricao, meta} = data
            this.titlo = titlo
            this.descricao = descricao
            this.meta = meta
            this.progresso = 0
            await this.db.criar_Conquista([this.__id, this.__id_User, this.titlo, this.descricao, this.meta, this.progresso, this.concluido])
        } catch (err) {
            console.log(`Erro ${err}`)
        }
    }
}