const express = require("express")
const rota = express.Router()
const {C_Conquista} = require("../controllers/C_Conquista")
const aute = require("../middlewares/autent")

const conq_C = new C_Conquista() 

rota.post("/criar", aute.autenticar, async (req, res) => await conq_C.criar(req, res))

rota.put("/concluir", aute.autenticar, async (req, res) => await conq_C.concluir(req, res))

rota.get("/get_p", aute.autenticar, async (req, res) => await conq_C.get_pendentes(req, res))
rota.get("/get_c", aute.autenticar, async (req, res) => await conq_C.get_concluidas(req, res))

rota.delete("/deletar", aute.autenticar, async (req, res) => await conq_C.deletar(req, res))
module.exports = {rota, }