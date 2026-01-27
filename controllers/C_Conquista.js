const {DB_Conquista} = require("../dao/DB_Conquista")
const {Conquista} = require("../models/M_Conquista")
const funcoes = require("../middlewares/funcoes")

class C_Conquista {
    constructor () {
        this.db = new DB_Conquista()
    }

    async criar(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const id_user = req.session.user.id
            const {titlo, descricao, preco} = req.body

            const conq = new Conquista(id, id_user, titlo, descricao, preco)

            await this.db.criar(conq.id, conq.id_user, conq.titlo, conq.descricao, conq.preco, conq.concluido)

            res.status(201).json({msg: "Conquista Criada"})
        } catch(err) {
            res.status(500).json({erro: err.message})
        }
    }

    async concluir(req, res) {
        try {
            const id_user = req.session.user.id
            const {id} = req.body

            await this.db.concluir(id, id_user)
            res.status(200).json({msg: "Conquista Concluida"})
        } catch(err) {
            res.status(500).json({erro: err.message})
        }
    }

    async get_pendentes(req, res) {
        try {
            const id = req.session.user.id
            const resposta = await this.db.get_pendentes(id)
            res.status(200).json(resposta)
        } catch (err) {
            res.status(400).json({erro: err.message})
        }
    }

    async get_concluidas(req, res) {
        try {
            const id = req.session.user.id
            const resposta = await this.db.get_concluidas(id)
            res.status(200).json(resposta)
        } catch (err) {
            res.status(400).json({erro: err.message})
        }
    }

    async deletar(req, res) {
        try {
            const id_user = req.session.user.id
            const {id} = req.body

            await this.db.deletar(id, id_user)
            res.status(200).json({msg: "Conquista Deletada"})
        } catch (err) {
            res.status(400).json({erro: err.message})
        }
    }
}

module.exports = {C_Conquista, }