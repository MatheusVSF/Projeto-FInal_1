const express = require("express")
const rota = express.Router()
const { C_Tag } = require("../controllers/C_Tag")

const aute = require("../middlewares/autent")

const tag_C = new C_Tag() // Nome da variável mais padrão

rota.post("/criar", aute.autenticar, async (req, res) => await tag_C.criar(req, res))
rota.get("/get_T", aute.autenticar, async (req, res) => await tag_C.get(req, res))
rota.delete("/dell", aute.autenticar, async (req, res) => await tag_C.deletar(req, res))

module.exports = { rota, }