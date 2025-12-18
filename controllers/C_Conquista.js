const {DB_Conquista} = require("../dao/DB_Conquista")
const {Conquista} = require("../models/M_Conquista")
const funcoes = require("../middlewares/funcoes")
const services = require("../services/services")

class C_Conquista {
    constructor () {
        this.db = new DB_Conquista()
    }

    async criar(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const id_user = req.session.user.id
            const {titlo, descricao, meta} = req.body

            const conq = new Conquista({id, id_user, titlo, descricao, meta})

            req.session.conq = {
                id: conq.id, 
                titlo: conq.titlo, 
                progresso: conq.progresso,
                meta: conq.meta
            }

            await this.db.criar_Conquista([conq.id, conq.id_user, conq.titlo, conq.descricao, conq.meta, conq.progresso, conq.concluido])

            res.status(201).json({msg: "Conquista Criada"})
        } catch(err) {
            res.status(500).json({erro: err.message})
        }
    }

    progredir(req, res) {
        try {
            let valor = req.body
            const id = req.session.conq.id
            services.progresso_conquista(id, valor)
        } catch(err) {
            res.status(500).json({erro: err.message})
        }
    }

    concluir(req, res) {
        try {
            const id = req.session.conq.id
            const meta = req.session.conq.meta
            let progresso = req.session.conq.progresso

            if (services.verificar_meta(meta, progresso)) {
                services.concluir(id)
            }
        } catch(err) {
            res.status(500).json({erro: err.message})
        }
    }

    async retornar(req, res) {
        try {
            const id = req.session.user.id
            const resposta = await this.db.Retronar_Conquistas(id)
            res.json({"conquistas": resposta})
        } catch(err) {
            res.status(400).json({erro: err.message})
        }
    }
}

module.exports = {C_Conquista, }