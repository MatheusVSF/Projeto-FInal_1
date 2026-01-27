function autenticar(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({erro: "Não autenticado"})
    }

    next()
}

function adm(req, res, next) {
    if (!req.session.user || req.session.user.email !== "sentience@gmail.com") {
        return res.status(401).json({erro: "Não autorizado"})
    }
    next()
}

module.exports = {autenticar, adm, }