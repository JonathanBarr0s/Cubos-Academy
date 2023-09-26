const express = require("express");
const controlador = require("./controladores/controlador");

const rotas = express();

rotas.post("/autor", controlador.cadastroAutor);
rotas.get("/autor/:id", controlador.buscarUmAutor);
rotas.post("/autor/:id/livro", controlador.cadastroLivro);
rotas.get("/livro", controlador.buscarLivro);

module.exports = rotas;
