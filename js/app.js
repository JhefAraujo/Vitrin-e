const express = require("express");
const path = require("path");
const randomstring = require("randomstring");

const app = express();
const port = 3000;
const randomLink = randomstring.generate(10);

app.get("/", (req, res) => {
    // Retorna a página HTML diretamente
    res.send("aaaaaaa");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
