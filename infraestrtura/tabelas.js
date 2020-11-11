class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimento();
    }

    criarAtendimento() {
        let sql = 'CREATE TABLE IF NOT EXISTS Atendimento (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, dataAtendimento DATETIME NOT NULL, createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updateAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,PRIMARY KEY(id))'

        this.conexao.query(sql, (erro, result, field) => {
            if (erro) {
                console.log('ERRO => ', erro)
                return;
            }
        })
    }

    dropTable() {
        let dropTable = 'DROP TABLE `agenda-petshop`.Atendimento CASCADE'

        this.conexao.query(dropTable, (erro, result, field) => {
            if (erro) {
                console.log(err)
            } else {
                console.log('Tabela dropada com sucesso! ', result);
            }
        })
    }
}

module.exports = new Tabelas;