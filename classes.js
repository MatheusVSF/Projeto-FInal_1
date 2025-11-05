const {DB_User} = require("./DB")
const funcoes = require("./funcoes")

const user = new DB_User()
//user.cadastrar_user(["12345678910", "matheusvitoriosfreitas@gmail.com", "22022008mV@", "Matheus", "mago", 0, 1, 0, true])
//Conquista
class Conquista {
    constructor() {
        this.id = funcoes.gerar_Id()
        this.id_user = user.id
    }
}

let C1 = new Conquista()
console.log(C1)