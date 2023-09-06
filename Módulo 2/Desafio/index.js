const express = require("express");
const { rotasBanco, rotasUsuario } = require("./rotas");
const { validarSenhaBanco } = require("./intermediarios");

const app = express();
const porta = 3000;

app.use(express.json());

app.use(rotasUsuario);
app.use(validarSenhaBanco);
app.use(rotasBanco);

app.listen(porta);
