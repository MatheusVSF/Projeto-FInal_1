const express = require("express")
const rota = express.Router()
const {C_Conquista} = require("../controllers/C_Conquista")
const aute = require("../middlewares/autent")

const conq_C = new C_Conquista() 

rota.post("/criar", aute.autenticar, async (req, res) => await conq_C.criar(req, res))
rota.put("/progredir", aute.autenticar, async (req, res) => await conq_C.progredir(req, res))
rota.put("/concluir", aute.autenticar, async (req, res) => await conq_C.concluir(req, res))
rota.get("/listar", aute.autenticar, async (req, res) => await conq_C.retornar(req, res))
module.exports = {rota, }