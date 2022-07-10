module.exports.index = function(application, req, res) {
    res.render('index')
}

module.exports.traducao = function(application, entradaTraducao, req, res) {
    var validacaoModel = application.src.models.dao.validacaoDAO();
    var traducaoModel = application.src.models.dao.dataBaseDAO();
    var textoTraducao

    validacaoModel.validarEntrada(entradaTraducao, (err, result) => {
        if(err)
            //tratar erro

        textoTraducao = result
    })

    traducaoModel.gerarTraducao(textoTraducao, (err, result) => {
        if(err)
            //tratar erro

        res.render('index', {textoTraduzido: result})
    })
}