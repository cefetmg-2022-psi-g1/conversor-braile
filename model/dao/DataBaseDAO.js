const {Client} = require('pg')
var texto = 'LA'

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'postgres',
    database: 'conversor-braile'
})

function traducao() {}

client.connect()

for(let caractere of texto) {
    client.query('SELECT br.cod_braile FROM braile br WHERE br.char_alfabeto = \'' + caractere + '\'', (err, res) => {
        if(err)
            console.log(err)
        else
            console.log(res.rows)
    })
}
/*
traducao.prototype.gerarTraducao = function(callback) {
    client.connect();
    for(caractere of texto) {
        client.query('SELECT br.cod_braile FROM braile br WHERE br.char_alfabeto = \'' + caractere + '\'', (err, res) => {
            if(err)
                callback(err)
            else
                callback(err, res)
            
            client.end
        })
    }
}
*/
//module.exports = function() {
    //return traducao;
//}