const express = require("express");
const controlador = require("./controlador/controladores");

const rotas = express();

rotas.post("/usuario", controlador.cadastrarUsuario);

module.exports = rotas;
