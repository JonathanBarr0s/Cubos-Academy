const express = require("express");
const produtos = require("./controladores/controlador");

const rotas = express();

rotas.get("/produtos", produtos.buscarprodutos);
rotas.get("/produtos/:id", produtos.buscarproduto);
rotas.get("/produtos/:id/frete/:cep", produtos.buscarprodutocep);


module.exports = rotas;
