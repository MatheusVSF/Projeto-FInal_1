const express = require("express")
const rota = express.Router()
const {C_User} = require("../controllers/C_User")

const aute = require("../middlewares/autent")

const user_C = new C_User()

//Primarios 
rota.post("/cadastrar", async (req, res) => await user_C.cadastrar(req, res))
rota.post("/login", async (req, res) => await user_C.login(req, res))

//Seguros 
rota.get("/get", aute.autenticar, async (req, res) => await user_C.get_user(req, res))
rota.put("/atualizar", aute.autenticar, async (req, res) => await user_C.update_perfil(req, res))
/*
rota.put("/atualizarPerfil",aute.autenticar,  async (req, res) => await user_C.update_perfil(req, res))
rota.delete("/",aute.autenticar,  async (req, res) => await user_C.deletar(req, res))
*/

//ADM
rota.get("/listar", aute.adm, async (req, res) => await user_C.listar(req, res))
module.exports = {rota,}