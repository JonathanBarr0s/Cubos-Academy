const express = require("express");
const { buscardados, encontrarImovel } = require("./controladores/imoveis");

const app = express();
const porta = 8000;

app.get("/imoveis", buscardados);

app.get("/imoveis/:id", encontrarImovel);

app.listen(porta);
