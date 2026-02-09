const { DB_Tag } = require("../dao/DB_Tag")
const { Tag } = require("../models/M_Tag")
const funcoes = require("../middlewares/funcoes")

class C_Tag {
    constructor() {
        this.db = new DB_Tag()
    }

    async criar(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const id_user = req.session.user.id // Corrigido de req.sessions
            const { titlo } = req.body

            const tag = new Tag(id, id_user, titlo)
            await this.db.criar(tag.id, tag.id_user, tag.titlo)
            res.status(200).json({ msg: "positivo" })
        } catch (err) {
            res.status(400).json({ erro: err.message })
        }
    }

    async get(req, res) {
        try {
            const id_user = req.session.user.id // Corrigido de req.sessions
            let resposta = await this.db.get_tags(id_user)
            res.status(200).json(resposta)
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async deletar(req, res) {
        try {
            const id_user = req.session.user.id // Corrigido de req.sessions
            let { id } = req.body
            await this.db.deletar(id, id_user)
            res.status(200).json({ msg: "positivo" })
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }
}

module.exports = { C_Tag, }