const { DB_Tarefa } = require("../dao/DB_Tarefa")
const { Tarefa } = require("../models/M_Tarefa")
const funcoes = require("../middlewares/funcoes")

class C_Tarefa {
    constructor() {
        this.db = new DB_Tarefa()
    }

    async criar(req, res) {
        try {
            const id = funcoes.gerar_Id()
            const user_id = req.session.user.id
            const { titlo, descricao, prazo, dificuldade, tags } = req.body

            // Tratamento de tags para evitar erro de sintaxe JSON
            let tagsFormatadas = tags;
            if (!tags || tags === "") {
                tagsFormatadas = null; // Ou [] se preferir
            } else {
                // Se o banco espera JSON, precisamos garantir que seja um JSON válido.
                // Se tags for apenas um ID "1", transformamos em JSON.
                // Se já for um objeto/array, mantemos.
                try {
                    // Tenta parsear pra ver se já é json string
                    JSON.parse(tags);
                    tagsFormatadas = tags;
                } catch (e) {
                    // Se não for json string, assume que é um valor simples e cria um objeto/array
                    tagsFormatadas = JSON.stringify([{ id: tags }]);
                }
            }

            const tarefa = new Tarefa(id, user_id, titlo, descricao, prazo, dificuldade, tagsFormatadas)
            await this.db.criar(tarefa.id, tarefa.user_id, tarefa.titlo, tarefa.descricao, tarefa.prazo, tarefa.dificuldade, tarefa.tags, tarefa.status)

            res.status(200).json({ msg: "positivo" })
        } catch (err) {
            res.status(400).json({ erro: err.message })
        }
    }

    async ger_pendentes(req, res) {
        try {
            const user_id = req.session.user.id
            const resposta = await this.db.get_tarefas_pendentes(user_id)

            res.status(200).json(resposta)
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async get_concluidas(req, res) {
        try {
            const user_id = req.session.user.id
            const resposta = await this.db.get_tarefas_concluidas(user_id)

            res.status(200).json(resposta)
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async concluir(req, res) {
        try {
            const { id } = req.body
            const user_id = req.session.user.id

            // 1. Busca Tarefa para ver Dificuldade
            const tarefa = await this.db.get_tarefa(id, user_id)
            if (!tarefa) throw new Error("Tarefa não encontrada")

            // 2. Define Recompensas
            let xp = 0;
            let moedas = 0;
            switch (tarefa.dificuldade) {
                case 'Média': xp = 20; moedas = 10; break;
                case 'Difícil': xp = 30; moedas = 15; break;
                default: xp = 10; moedas = 5; // Fácil
            }

            // 3. Conclui Tarefa (Status = True)
            await this.db.concluir(id, user_id)

            // 4. Adiciona Recompensas ao Usuário
            const { DB_User } = require("../dao/DB_User")
            const dbUser = new DB_User();

            const usuarioAtualizado = await dbUser.adicionar_recompensa(user_id, xp, moedas);

            // 5. Verifica Level Up
            // Regra simples: A cada 100 XP sobe 1 nível
            const novoNivel = Math.floor(usuarioAtualizado.xp / 100) + 1;
            let levelUp = false;

            if (novoNivel > usuarioAtualizado.nivel) {
                await dbUser.atualizar_nivel(user_id, novoNivel);
                levelUp = true;
            }

            res.status(200).json({
                msg: "positivo",
                xp_ganho: xp,
                moedas_ganhas: moedas,
                novo_xp: usuarioAtualizado.xp,
                novo_nivel: novoNivel,
                level_up: levelUp
            })

        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }

    async deletar(req, res) {
        try {
            const user_id = req.session.user.id
            const { id } = req.body
            await this.db.deletar(id, user_id)
            res.status(200).json({ msg: "positivo" })
        } catch (err) {
            res.status(500).json({ erro: err.message })
        }
    }
}

module.exports = { C_Tarefa, }