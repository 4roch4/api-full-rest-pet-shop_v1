const Atendimento = require('../models/atendimento')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        let id = parseInt(req.params.id, 10)
        Atendimento.listaWhere(id, res);
    })

    app.post('/atendimentos', (req, res) => {
        let atendimento = req.body
        Atendimento.adiciona(atendimento, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        let id = parseInt(req.params.id, 10)
        let atendimento = req.body
        Atendimento.altera(id, atendimento, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        let id = parseInt(req.params.id, 10)
        let atendimento = req.body
        Atendimento.deleta(id, res)
    })
}