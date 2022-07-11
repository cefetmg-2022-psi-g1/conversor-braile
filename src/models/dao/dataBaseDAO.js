const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'admin',
    database: '2braile'
})


module.exports.gerarTraducao = function(textoTraducao, callback) {
    client.connect()
    var textoTraduzido = []

    for(let i = 0; i < textoTraducao.length; i++) {
        client.query('SELECT br.cod_braile FROM braile br WHERE br.char_alfabeto = \'' + textoTraducao[i] + '\'', (err, res) => {
            textoTraduzido.push(res.rows)
            if(i == textoTraducao.length - 1) {
                callback(null, textoTraduzido)
                client.end()
            }
        })
    }
}