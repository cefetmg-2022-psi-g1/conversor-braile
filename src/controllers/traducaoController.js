module.exports.index = function(application, req, res) {
    let resultado = []
    res.render('index', {textoTraduzido: resultado})
}

module.exports.traducao = function(application, entradaTraducao, req, res) {
    let textoTraducao = ''

    application.src.models.dao.validacaoDAO.validarEntrada(entradaTraducao, function(err, result) {
        //if(err)
            //tratar erro

        textoTraducao = result
        //console.log(textoTraducao)
    })

    application.src.models.dao.dataBaseDAO.gerarTraducao(textoTraducao, function(err, result) {
        console.log(result)
        //if(err)
           //console.log(err)
        
        res.render('index', {textoTraduzido: result})
    })
}