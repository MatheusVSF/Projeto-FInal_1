const { DB_Conquista } = require("../dao/DB_Conquista")
const { Conquista } = require("../models/M_Conquista")
const funcoes = require("../middlewares/funcoes")

class C_Conquista {
    constructor() {
        this.db = new DB_Conquista()
    }

    async criar(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const id_user = req.session.user.id
            const { titlo, descricao, preco } = req.body

            const conq = new Conquista(id, id_user, titlo, descricao, preco)

            await this.db.criar(conq.id, conq.id_user, conq.titlo, conq.descricao, conq.preco, conq.concluido)

            res.status(201).json({ msg: "Conquista Criada" })
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async concluir(req, res) {
        try {
            const id_user = req.session.user.id
            const { id } = req.body

            await this.db.concluir(id, id_user)
            res.status(200).json({ msg: "Conquista Concluida" })
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async get_pendentes(req, res) {
        try {
            const id = req.session.user.id
            const resposta = await this.db.get_pendentes(id)
            res.status(200).json(resposta)
        } catch (err) {
            res.status(400).json({ erro: err.message })
        }
    }

    async get_concluidas(req, res) {
        try {
            const id = req.session.user.id
            const resposta = await this.db.get_concluidas(id)
            res.status(200).json(resposta)
        } catch (err) {
            res.status(400).json({ erro: err.message })
        }
    }

    async deletar(req, res) {
        try {
            const id_user = req.session.user.id
            const { id } = req.body

            await this.db.deletar(id, id_user)
            res.status(200).json({ msg: "Conquista Deletada" })
        } catch (err) {
            res.status(400).json({ erro: err.message })
        }
    }

    // --- LOJA ---
    async criar_item_loja(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const { titlo, descricao, preco } = req.body
            // Apenas admin vira loja? Por enquanto deixo aberto ou verifico email 'sentience'
            // if (req.session.user.email !== 'sentience@gmail.com') return res.status(403).json({erro: "Apenas admin cria itens na loja"})

            await this.db.criar_item_loja(id, titlo, descricao, preco)
            res.status(201).json({ msg: "Item criado na loja" })
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async listar_loja(req, res) {
        try {
            const id_user = req.session.user.id
            const itens = await this.db.carregar_loja(id_user)
            res.status(200).json(itens)
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async comprar(req, res) {
        try {
            const id_user = req.session.user.id
            const { id_item, titlo, descricao, preco } = req.body // Recebe dados do item
            const { DB_User } = require("../dao/DB_User")
            const dbUser = new DB_User()

            // 1. Verifica Saldo
            const saldo = await dbUser.get_saldo(id_user)
            if (saldo < preco) {
                return res.status(400).json({ erro: "Saldo insuficiente" })
            }

            // 2. Verifica Posse
            const jaTem = await this.db.verificar_posse(titlo, id_user)
            if (jaTem) {
                return res.status(400).json({ erro: "Você já possui este item" })
            }

            // 3. Debita e Compra
            await dbUser.debitar_moedas(id_user, preco)
            const id_new = funcoes.gerar_Id()
            await this.db.comprar(id_item, id_new, id_user, titlo, descricao, preco) // id_item original não é usado na cópia, mas mantido ref se precisar

            res.status(200).json({ msg: "Compra realizada com sucesso!" })

        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }
}

module.exports = { C_Conquista, }