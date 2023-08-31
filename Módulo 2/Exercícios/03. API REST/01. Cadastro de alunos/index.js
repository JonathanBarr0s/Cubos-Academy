const express = require("express");
const rotas = require('./roteador')

const app = express();
const porta = 4000;

app.use(express.json());

app.use(rotas);

app.listen(porta);
