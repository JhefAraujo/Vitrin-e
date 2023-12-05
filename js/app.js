const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware para processar dados JSON

// Mapa para armazenar temporariamente os URLs gerados
const urlMap = new Map();

app.post('/gerar-url', (req, res) => {
    // Dados enviados pelo front-end
    const dadosDoFront = req.body;

    // Gera um identificador único
    const uniqueId = uuidv4();

    // Cria o conteúdo do novo URL (pode ser uma página HTML, JSON, etc.)
    const novoConteudoURL = {
        id: uniqueId,
        dados: dadosDoFront,
    };

    // Armazena temporariamente o conteúdo com o identificador único
    urlMap.set(uniqueId, novoConteudoURL);

    // Envia o identificador único como resposta
    res.send({ url: `/visualizar/${uniqueId}`, uniqueId });
});

app.get('/visualizar/', (req, res) => {
    const id = req.params.id;

    // Obtém o conteúdo associado ao identificador único
    const conteudoURL = urlMap.get(id);

    if (conteudoURL) {
        // Se existir, cria uma página HTML com os dados e envia como resposta
        const html = `
            <html>
                <head>
                    <title>Visualização</title>
                </head>
                <body>
                    <h1>Dados do Front-end</h1>
                    <pre>aaaa</pre>
                </body>
            </html>
        `;
        res.send(html);
    } else {
        // Se não existir, envia uma resposta de erro
        res.status(404).send('URL não encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
