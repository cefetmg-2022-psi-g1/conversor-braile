const bodyParser = require('body-parser')
const express = require('express')
var consign = require('consign')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

consign()
    .include('src/controllers')
    .then('src/models')
    .then('src/routes')
    .into(app)

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('src/content'));
app.use(bodyParser.json());

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
})

app.post('/', function(req, res) {
    var entradaTraducao = req.body.entradaTraducao
    app.src.controllers.traducaoController.traducao(app, entradaTraducao, req, res)
})




