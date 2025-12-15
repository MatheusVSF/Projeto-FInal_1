function autenticar(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({erro: "Não autenticado"})
    }

    next()
}

module.exports = {autenticar, }