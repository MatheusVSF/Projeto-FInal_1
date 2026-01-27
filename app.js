const express = require("express")
const session = require("express-session")
const R_User = require("./routes/R_User")
const R_Tarefa = require("./routes/R_Tarefas")
const R_Conquista = require("./routes/R_Conquistas")
const R_Tag = require("./routes/R_Tag")

const cors = require("cors")

const app = express()

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}))
//Ativando o json
app.use(express.json())
//Ativando as sessões
app.use(session({
    secret: "chave",
    resave: false,
    saveUninitialized: true, 
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 //1 hora
    }
}))

//Usando as rotas
app.use("/user", R_User.rota)
app.use("/tarefa", R_Tarefa.rota)
app.use("/conquista", R_Conquista.rota)
app.use("/tag", R_Tag.rota)
//Ativando o servidor 
app.listen(3000)
