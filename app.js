const express = require("express")
const session = require("express-session")
const R_User = require("./routes/R_User")
const R_Tarefa = require("./routes/R_Tarefas")
const R_Conquista = require("./routes/R_Conquistas")
const R_Tag = require("./routes/R_Tag")

const cors = require("cors")

const app = express()

app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://127.0.0.1:5502", "http://127.0.0.1:5503", "http://127.0.0.1:5504", "http://127.0.0.1:5505", "http://127.0.0.1:5506"],
    credentials: true
}))

app.use(express.json())

app.use(session({
    secret: "chave",
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 //1 hora
    }
}))


app.use("/user", R_User.rota)
app.use("/tarefa", R_Tarefa.rota)
app.use("/conquista", R_Conquista.rota)
app.use("/tag", R_Tag.rota)

app.listen(3000)
