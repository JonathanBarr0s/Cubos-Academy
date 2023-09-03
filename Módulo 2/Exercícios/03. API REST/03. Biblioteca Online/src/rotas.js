const express = require("express");
const livros = require("./controladores/controlador");

const rotas = express();

rotas.get("/livros", livros.buscarlivros);
rotas.get("/livro/:id", livros.buscarlivro);
rotas.post("/livro", livros.adicionarlivro);

module.exports = rotas;
