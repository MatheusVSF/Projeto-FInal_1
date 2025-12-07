require("dotenv").config()
const port = process.env.PORT

const express = require("express")
const app = express() 
app.use(express.json())

const {DB_User} = require("./DB")
const useDB = new DB_User()

const funcoes = require("./funcoes")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", async(req, res) => {
    const usuarios = await useDB.listar_user()
    res.render("index", {usuarios})
})

app.post("/usuarios", async(req, res) => {
    const id = funcoes.gerar_Id()
    const {email, senha, nome, classe} = req.body
    try {
        await useDB.cadastrar_user([id, email, senha, nome, classe, 0, 1, 0, true])
        res.redirect("/")
    } catch (err) {
        res.send(err.message)
    }
})

app.post("/usuario/deletar/:id", async (req, res) => {
    await useDB.deletar_user(req.params.id)
    res.redirect("/")
})

app.post("/usuarios/editar/:id", async (req, res) => {
  const { coluna, novo_valor } = req.body
  await userDB.update_user(coluna, novo_valor, req.params.id)
  res.redirect("/")
})

app.listen(port, () => console.log(`http://localhost:${port}`))