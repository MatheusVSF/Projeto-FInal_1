const express = require("express")
const rota = express.Router()
const { C_User } = require("../controllers/C_User")

const aute = require("../middlewares/autent")

const user_C = new C_User()


rota.post("/cadastrar", async (req, res) => await user_C.cadastrar(req, res))
rota.post("/login", async (req, res) => await user_C.login(req, res))


rota.get("/get", aute.autenticar, async (req, res) => await user_C.get_user(req, res))
rota.put("/atualizar", aute.autenticar, async (req, res) => await user_C.update_perfil(req, res))
rota.post("/logout", aute.autenticar, async (req, res) => await user_C.loginOut(req, res))

rota.get("/listar", aute.adm, async (req, res) => await user_C.listar(req, res))
rota.post("/deletar_adm", aute.adm, async (req, res) => await user_C.deletar_adm(req, res))

module.exports = { rota, }