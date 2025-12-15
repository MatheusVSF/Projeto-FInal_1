const express = require("express")
const session = require("express-session")

const app = express()
app.use(express.json())

app.use(session({
    secret: "projeto",
    resave: false,
    saveUninitialized: false, 
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hora
    }
}))

const user_R = require("./routes/R_User")
const conq_R = require("./routes/R_Conquistas")

app.use("/user", user_R.rota)
app.use("/conq", conq_R.rota)

app.listen(3000)