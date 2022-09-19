/*function numSubscrito(texto) {
    let underIndex = texto.indexOf('_')

    if(texto[underIndex + 1] == '{') {
        let fechaChaveIndex = texto.indexOf('}', underIndex + 2)
        if(fechaChaveIndex != -1) {
            for(let i = underIndex + 2; i < fechaChaveIndex; i++) {

            }
        }
    }
}*/

module.exports.validarEntrada = function(entradaTraducao, callback) {
    //blablabla
    var textoTraducao = entradaTraducao.replace("</sub>", "")
    textoTraducao = textoTraducao.replaceAll("<sub>", "♂")
    textoTraducao = textoTraducao.replaceAll("</sub>", "")
    textoTraducao = textoTraducao.replaceAll("</sup>", "")
    textoTraducao = textoTraducao.replaceAll("<sup>", "♀")
    callback(null, textoTraducao)
}