const bodyParser = require('body-parser')
const express = require('express')
const controller = require('./src/controllers')
var consign = require('consign')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

consign()
    .include('src/controllers')
    .then('src/models')
    .then('src/views')
    .into(app)

app.set('views', './src/views')
app.set('view engine', 'ejs')

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
})

app.post('src/view/index', function(req, res) {
    var entradaTraducao = req.body.entradaTraducao
    controller.traducaoController.traducao(app, entradaTraducao, req, res)
})




