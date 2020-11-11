const customExpress = require('./config/customExpress')
const conexao = require('./infraestrtura/conexao')
const Tabelas = require('./infraestrtura/tabelas')

conexao.connect(erro =>{
    if(erro){
        console.log('Erro ao acessar o banco de dados => ', erro)
    } else {
      conexao.query('SELECT now() AS datetime', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].datetime);
      });
      
      Tabelas.init(conexao);
      const app = customExpress()
      app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
});

