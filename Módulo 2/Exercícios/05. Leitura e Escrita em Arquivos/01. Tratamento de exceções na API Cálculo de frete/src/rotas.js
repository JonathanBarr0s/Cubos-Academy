const express = require('express');
const { buscarProdutos, detalharProduto, calcularFrete } = require('./controladores/produtos');

const rotas = express();

rotas.get('/produtos', buscarProdutos);
rotas.get('/produtos/:idProduto', detalharProduto);
rotas.get('/produtos/:idProduto/frete/:cep', calcularFrete);

module.exports = rotas;