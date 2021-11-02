
module.exports = {

    async gerar(req, res) {

    
    var JSIntegration = require('../JSIntegration'); // Chame aqui o arquivo JSIntegration.js
 
    // Inicializo o meu objeto JSIntegration
    var jsIntegration = new  JSIntegration(
      'http://localhost:8080/jasperserver', // URL do Jasper Server
      `reports/${req.params.rel}`,        // Caminho para o Relatório, sem a primeira barra
      'pdf',                                // Tipo do Relatório
      'jasperadmin',                        // Usuário com acesso ao relatório
      'jasperadmin',                         // Senha do usuário
      {}  // Passo o parâmetro do aluno_escola_filtro com base na requisição
    );
     
    // Obtenho os dados
    var data = await jsIntegration.execute();
 
    // Imprimo um header para o meu arquivo que vai ser baixado
    // No caso, header de PDF. Altere os parâmetros conforme desejado
    // Se quiser que seja download, substitua inline por attachment
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'inline;filename=' + 'relatorio.pdf',
        'Content-Length': data.length
    });
 
    // Imprime os dados
    res.end(data);
 

    },


}