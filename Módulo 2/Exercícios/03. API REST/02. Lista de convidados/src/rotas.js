const express = require("express");
const convidados = require("./controladores/controlador");

const rotas = express();

rotas.get("/convidados", convidados.buscarconvidados);
rotas.get("/convidado", convidados.buscarconvidado);
rotas.post("/convidados", convidados.novoconvidado);
rotas.delete("/convidado/:nome", convidados.removerconvidado);

module.exports = rotas;
