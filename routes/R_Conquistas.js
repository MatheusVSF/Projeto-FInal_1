const express = require("express")
const rota = express.Router()
const { C_Conquista } = require("../controllers/C_Conquista")
const aute = require("../middlewares/autent")

const conq_C = new C_Conquista()

rota.post("/criar", aute.autenticar, async (req, res) => await conq_C.criar(req, res))

rota.put("/concluir", aute.autenticar, async (req, res) => await conq_C.concluir(req, res))

rota.get("/get_p", aute.autenticar, async (req, res) => await conq_C.get_pendentes(req, res))
rota.get("/get_c", aute.autenticar, async (req, res) => await conq_C.get_concluidas(req, res))

rota.delete("/deletar", aute.autenticar, async (req, res) => await conq_C.deletar(req, res))

// --- LOJA ---
rota.post("/criar_loja", aute.autenticar, async (req, res) => await conq_C.criar_item_loja(req, res))
rota.get("/listar_loja", aute.autenticar, async (req, res) => await conq_C.listar_loja(req, res))
rota.post("/comprar", aute.autenticar, async (req, res) => await conq_C.comprar(req, res))

module.exports = { rota, }