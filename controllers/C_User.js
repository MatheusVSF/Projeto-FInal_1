const {DB_User} = require("../dao/DB_User")
const {User} = require("../models/M_User")
const funcoes = require("../middlewares/funcoes")
const services = require("../services/services")

class C_User {
    constructor () {
        this.db = new DB_User()
    }

    async cadastrar(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const {email, senha, nome, classe} = req.body
            
            if (services.validarCadastro({email, senha})) {
                const user = new User({id, email, senha, nome, classe})

                await this.db.cadastrar_user(user.id, user.email, user.senha, user.nome, user.classe, user.xp, user.nivel, user.moedas, user.ativo)

                res.status(201).json({msg: "User cadastrado"})
            } else {
                res.json({msg: "Não pode cadastrar"})
            }
        
        } catch(err) {
            res.status(500).json({erro: err.message})
        }
    }

    async login(req, res) {
        const {email, senha} = req.body

        const user = await this.db.buscarEmail(email)
        
        if (!user || user.senha !== senha) {
            return res.status(401).json({erro: "Login inválido"})
        }

        req.session.user = {
            id: user.id, 
            nome: user.nome, 
            email: user.email,
            classe: user.classe,
            xp: user.xp, 
            nivel: user.nivel, 
            moedas: user.moedas
        }

        res.json({ msg: "Logado com sucesso" })
    }

    async listar(req, res) {
        const resposta = await this.db.listar_user()
        //res.send(resposta.map(u => u.id))
        res.json(resposta)
    }

    async update_perfil(req, res) {
        const {coluna, valor} = req.body
        const id = req.session.user.id
        if (services.colunasEditaveis(coluna)) {
            await this.db.update_user(coluna, valor, id)
            res.json({msg: "Atualizado"})
        } else {
            res.json({msg: "Atualização não possivel"})
        }

        
    }

    async deletar(req, res) {
        const {id} = req.body
        await this.db.deletar_user(id)
        res.send("Deletado")
    }
}

module.exports = {C_User,}