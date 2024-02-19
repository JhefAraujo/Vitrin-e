const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const app = express();
const port = 3000;

const pageDictionary = {};

// Adiciona o middleware bodyParser para interpretar o corpo da requisição como JSON
app.use(bodyParser.json());

app.post('/generate-link', (req, res) => {
    const linkId = shortid.generate();

    // Adicione um carimbo de data e hora de expiração (48 horas)
    const expirationTime = Date.now() + 48 * 60 * 60 * 1000; // 48 horas em milissegundos
    
    // Obtém o parâmetro do sistema a partir do corpo da requisição
    const parametroDoSistema = req.body.parametroDoSistema || 'Default Content';
    
    // Modifique esta parte para incluir o conteúdo desejado com base no parâmetro
    const htmlPage = `<html><body><h1>Conteúdo da Página ${linkId}</h1><p>${parametroDoSistema}</p></body></html>`;

    // Armazena o conteúdo da página junto com o tempo de expiração
    pageDictionary[linkId] = {
        htmlPage,
        expirationTime,
    };

    res.json({ link: `http://localhost:${port}/${linkId}` });
});

app.get('/:linkId', (req, res) => {
    const linkId = req.params.linkId;

    if (pageDictionary[linkId]) {
        const { htmlPage, expirationTime } = pageDictionary[linkId];

        // Verifica se o link expirou
        if (Date.now() < expirationTime) {
            res.send(htmlPage);
        } else {
            res.status(410).send('Link expirado'); // 410 - Gone (Recurso Removido)
        }
    } else {
        res.status(404).send('Página não encontrada');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
