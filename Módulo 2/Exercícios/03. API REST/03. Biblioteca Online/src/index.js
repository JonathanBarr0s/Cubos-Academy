const express = require("express");
const rotas = require("./rotas");

const app = express();
const porta = 3000;

app.use(express.json());

app.use(rotas);

app.listen(porta);
