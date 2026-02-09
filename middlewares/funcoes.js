function gerar_Id() {
    let id = ""
    for (let i=0; i<15; i++) {
        id += Math.floor(Math.random() * 10)
    }
    return id
}

//console.log(gerar_Id())
module.exports = {
    gerar_Id, 
}