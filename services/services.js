function validar_Cadastro({email, senha}) {
    if (!email.includes("@") || senha.length < 6) {
        return false
    }

    return true
}

function colunasEditaveis(coluna) {
    const colunas = ["email", "senha", "nome", "classe"]
    if (!colunas.includes(coluna)) {
        return false
    }
    return true
}
module.exports = {validar_Cadastro, colunasEditaveis, }