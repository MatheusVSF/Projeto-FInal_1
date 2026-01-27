const express = require("express")
const rota = express.Router()
const {C_Tag} = require("../controllers/C_Tag")

const aute = require("../middlewares/autent")

const tag = new C_Tag()

rota.post("/criar", aute.autenticar, async (req, res) => await tag.criar(req, res))
rota.get("/get_T", aute.autenticar, async (req, res) => await tag.get(req, res))
rota.delete("/dell", aute.autenticar, async (req, res) => await tag.deletar(req, res))

module.exports = {rota, }