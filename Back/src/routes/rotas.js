const express = require("express")
const rota = express.Router()
const app = express()
app.use(express.json())


require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") })

//Rotas de usuario 
const {C_User} = require("../controllers/SC_User")
const c_user = new C_User
rota.post("/Criar", async (req, res) => await c_user.criar(req, res))
rota.get("/Listar", async (req, res) => await c_user.listar(req, res))
rota.post("/Editar", async (req, res) => await c_user.update(req, res))
rota.post("/Deletar", async (req, res) => await c_user.deletar(req, res))

app.use("/users", rota)

app.listen(process.env.PORT || 3020)