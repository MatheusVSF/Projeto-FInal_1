const { DB_User } = require("../dao/DB_User")
const { User } = require("../models/M_User")
const funcoes = require("../middlewares/funcoes")
const services = require("../services/services")

class C_User {
    constructor() {
        this.db = new DB_User()
    }

    async cadastrar(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const { email, senha, nome, classe } = req.body

            if (services.validar_Cadastro({ email, senha })) {
                const user = new User(id, email, senha, nome, classe)

                await this.db.cadastrar_user(user.id, user.email, user.senha, user.nome, user.classe, user.xp, user.nivel, user.moedas, user.conquistas, user.ativo)

                res.status(201).json({ msg: "User cadastrado" })
            } else {
                res.json({ msg: "Não pode cadastrar" })
            }

        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body
            const user = await this.db.login(email, senha)
            if (user.length === 0) {
                return res.status(401).json({ erro: "Login inválido" })
            }
            req.session.user = {
                id: user[0].id,
                nome: user[0].nome,
                email: user[0].email,
                classe: user[0].classe,
                xp: user[0].xp,
                nivel: user[0].nivel,
                moedas: user[0].moedas,
                conquistas: user[0].conquistas,
                ativo: user[0].ativo
            }

            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ erro: "Erro ao Salvar" })
                }
                res.status(200).json(req.session.user)
            })

        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async get_user(req, res) {
        try {
            const user = await this.db.get_user(req.session.user.id)
            res.status(200).json(user[0])
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }
    async update_perfil(req, res) {
        try {
            const { coluna, valor } = req.body
            const id = req.session.user.id
            if (services.colunasEditaveis(coluna)) {
                await this.db.update_user(coluna, valor, id)
                res.json({ msg: "Atualizado" })
            } else {
                res.json({ msg: "Atualização não possivel" })
            }
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.session.user.id
            const senha = req.body
            await this.db.deletar_user(id, senha)
            res.send("Deletado")
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async loginOut(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) { return res.status(500).json({ erro: "Erro ao Sair" }) }
                res.clearCookie('connect.sid')
                res.status(200).json({ msg: "user" })
            })
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    //ADM 
    async listar(req, res) {
        try {
            const user = await this.db.listar_users()
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({ erro: err.message })
            res.status(500).json({ erro: err.message })
        }
    }

    async deletar_adm(req, res) {
        try {
            const { id } = req.body
            await this.db.deletar_user_adm(id)
            res.status(200).json({ msg: "Usuário deletado com sucesso" })
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }
}

module.exports = { C_User, }