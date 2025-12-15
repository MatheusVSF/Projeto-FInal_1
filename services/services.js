const {DB_User} = require("../dao/DB_User")
const {DB_Conquista} = require("../dao/DB_Conquista")

const user = new DB_User()
const conq = new DB_Conquista()

function validarCadastro({email, senha}) {
    if (!email.includes("@") || senha.length < 6) {
        return false
    } 
    return true
}

function colunasEditaveis(coluna) {
    const permitidos = ["email", "senha", "nome", "classe"]

    if (!permitidos.includes(coluna)) {
        return false
    }

    return true
}

//Updates 
async function UP_xp(valor, id) {
    await user.update_user("xp", valor, id)
}
async function UP_nivel(valor, id) {
    await user.update_user("nivel", valor, id)
}
async function UP_moedas(valor, id) {
    await user.update_user("moedas", valor, id)
}

//Conquistas 
async function progresso_conquista(id, valor) {
    if (valor > 0) {
        await conq.progredir(id, valor)
        return valor
    } else {
        return false
    }
}
function verificar_meta(meta, progresso) {
    if (progresso >= meta) {
        return true
    } else {
        return false
    }
}
async function concluir(id) {
    await conq.Concluir(id)
}

module.exports = {validarCadastro, colunasEditaveis, UP_xp, UP_nivel, UP_moedas, progresso_conquista, verificar_meta, concluir, }