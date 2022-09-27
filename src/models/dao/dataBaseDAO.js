
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const senhabd = process.env.MONGODBSENHA
const uri = "mongodb+srv://2braile:" + senhabd + "@2braile.v8tfqlo.mongodb.net/?retryWrites=true&w=majority"
//console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  console.log("Connected correctly to server");
});


async function isConnected() {
    return !!client && !!client.topology && client.topology.isConnected()
}



module.exports.gerarTraducao = async function(textoTraducao, callback) {

    if(await isConnected() == false) {
        client.connect(err => {
            console.log("Connected correctly to server");
        });
    }

    const collection = client.db("2braile").collection("caracteres");
    var textoTraduzido = []

    for(let i = 0; i < textoTraducao.length; i++) {
        let query = {caracterRomano: textoTraducao[i]}
        const objConsulta = await collection.findOne(query)
        
        if (objConsulta == null) 
            textoTraduzido.push("□")
        
        else
            textoTraduzido.push(objConsulta.codBraile)

        if(i == textoTraducao.length - 1) {
            callback(null, textoTraduzido)
        }
    }

}



