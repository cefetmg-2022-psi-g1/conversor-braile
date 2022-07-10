const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'admin',
    database: '2braile'
})

function traducao() {}

client.connect()

traducao.prototype.gerarTraducao = function(textoTraducao, callback) {
    var textoTraduzido = []
    client.connect();
    for(caractere of textoTraducao) {
        client.query('SELECT br.cod_braile FROM braile br WHERE br.char_alfabeto = \'' + caractere + '\'', (err, res) => {
            if(err)
                callback(err)
            else
                textoTraduzido.push(res)
        })
    }

    callback(err, textoTraduzido)

    client.end
}

module.exports = function() {
    return traducao;
}