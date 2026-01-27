const express = require("express")
const rota = express.Router()
const {C_Tarefa} = require("../controllers/C_Tarefas")
const aute = require("../middlewares/autent")

const tarefa_C = new C_Tarefa()

rota.post("/criar", aute.autenticar, async (req, res) => await tarefa_C.criar(req, res))

rota.get("/get_p", aute.autenticar, async (req, res) => await tarefa_C.ger_pendentes(req, res))
rota.get("/get_c", aute.autenticar, async (req, res) => await tarefa_C.get_concluidas(req, res))

rota.post("/concluir", aute.autenticar, async (req, res) => await tarefa_C.concluir(req, res))

rota.post("/deletar", aute.autenticar, async (req, res) => await tarefa_C.deletar(req, res))
module.exports = {rota, }