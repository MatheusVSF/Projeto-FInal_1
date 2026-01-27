const {DB_Tarefa} = require("../dao/DB_Tarefa")
const {Tarefa} = require("../models/M_Tarefa")
const funcoes = require("../middlewares/funcoes")

class C_Tarefa {
    constructor() {
        this.db = new DB_Tarefa()
    }

    async criar(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const user_id = req.session.user.id
            const {titlo, descricao, prazo, dificuldade, tags} = req.body
            const tarefa = new Tarefa(id, user_id, titlo, descricao, prazo, dificuldade, tags) 
            await this.db.criar(tarefa.id, tarefa.user_id, tarefa.titlo, tarefa.descricao, tarefa.prazo, tarefa.dificuldade, tarefa.tags, tarefa.status)

            res.status(200).json({msg: "positivo"})
        } catch (err) {
            res.status(400).json({erro: err.message})
        }
    }  

    async ger_pendentes(req, res) {
        try {
            const user_id = req.session.user.id
            const resposta = await this.db.get_tarefas_pendentes(user_id)

            res.status(200).json(resposta)
        } catch (err) {
            res.status(500).json({erro: err.message})
        }
    }

    async get_concluidas(req, res) {
        try {
            const user_id = req.session.user.id
            const resposta = await this.db.get_tarefas_concluidas(user_id)

            res.status(200).json(resposta)
        } catch (err) {
            res.status(500).json({erro: err.message})
        }
    }

    async concluir(req, res) {
        try {
            const user_id = req.session.user.id
            const {id} = req.body
            await this.db.concluir(id, user_id)
        } catch (err) {
            res.status(500).json({erro: err.message})
        }
    }

    async deletar(req, res) {
        try {
            const user_id = req.session.user.id
            const {id} = req.body
            await this.db.deletar(id, user_id)
        } catch (err) {
            res.status(500).json({erro: err.message})
        }
    }
}

module.exports = {C_Tarefa, }