const conexao = require('../infraestrtura/conexao')
const moment = require('moment')

class Atendimento {
    adiciona(atendimento, res) {
        let dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        let dateTimeNow = moment().format('YYYY-MM-DD');
        console.log(dateTimeNow)
        //**Validaçoes
        let dataAtendValida = moment(dataAtendimento).isSameOrAfter(dateTimeNow)
        let nomeCliente = atendimento.cliente.length >= 5

        const validacoes = [{
            nome: 'dataAtendimento',
            value: dataAtendimento,
            valido: dataAtendValida,
            mensagem: `A data de atendimento ${dataAtendimento} dever ser maior ou igual a data atual`
        },
        {
            nome: 'cliente',
            value: atendimento.cliente,
            valido: nomeCliente,
            mensagem: 'O nome do cliente deve ter pelo menos 5 caracteres'

        }]

        const erros = validacoes.filter(campo => !campo.valido)

        if (erros.length) {
            res.status(400).json(erros)

        } else {
            let atendimentoComData = { ...atendimento, dataAtendimento }
            const sql = 'INSERT INTO Atendimento SET ?'
            conexao.query(sql, atendimentoComData, (erro, result) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(result)
                }
            })
        }
    }
    lista(res) {
        let sql = `SELECT * FROM Atendimento`

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(result)
            }
        })

    }
    listaWhere(id, res) {
        let sql = `SELECT * FROM Atendimento where id = ${id}`

        conexao.query(sql, (erro, result) => {
            let resultado = result[0]

            if (erro) {
                res.status(400).json(erro)

            } else if (result.length < 1) {
                res.status(400).json({ message: 'Não existe resultado para o valor enviado no parametro.', parametro: id })

            } else {
                res.status(200).json(resultado)
            }
        })

    }
    altera(id, atendimento, res) {
        let sql = `UPDATE Atendimento SET ? where id = ?`

        conexao.query(sql, [atendimento, id], (erro, result) => {

            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(result)
            }
        })

    }
    deleta(id, res) {
        let sql = `DELETE FROM Atendimento WHERE id = ?`
        let sqlSelect = `SELECT * FROM Atendimento WHERE id = ?`

        conexao.query(sql, id, (erro, result) => {

            if (erro) {
                res.status(400).json(erro)
            } else {
                if (result.affectedRows >= 1) {
                    res.status(200).json({ messagee: 'Registro deletado com sucesso', id: id })
                } else {
                    res.status(400).json({ message: 'Registro não localizado na base de daddos' })
                }
            }
        })
    }
}

module.exports = new Atendimento