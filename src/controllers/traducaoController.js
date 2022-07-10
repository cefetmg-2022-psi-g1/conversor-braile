module.exports.index = function(application, req, res) {
    let resultado = []
    res.render('index', {textoTraduzido: resultado})
}

module.exports.traducao = function(application, entradaTraducao, req, res) {
    var validacaoModel = application.src.models.dao.validacaoDAO.validarEntrada();
    var traducaoModel = application.src.models.dao.dataBaseDAO();
    var textoTraducao

    validacaoModel(entradaTraducao, function(err, result) {
        if(err)
            //tratar erro

        textoTraducao = result
    })

    traducaoModel.gerarTraducao(textoTraducao, function(err, result) {
        if(err)
            //tratar erro

        res.render('index', {textoTraduzido: result})
    })
}