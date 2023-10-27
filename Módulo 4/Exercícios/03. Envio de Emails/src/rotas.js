const express = require("express");
const { login } = require("./controladores/controladores");

const rotas = express();

rotas.get("/", login);

module.exports = rotas;
