const express = require("express");
const {
  cadastrarUsuario,
  login,
  usuario,
  atualizarUsuario,
  listarCategorias,
  listarTransacoes,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  exibirExtrato,
  detalharTransacao,
} = require("./controlador/controladores");
const verificarUsuarioLogado = require("./intermediario/intermediarios");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(verificarUsuarioLogado);

rotas.get("/usuario", usuario);
rotas.put("/usuario", atualizarUsuario);
rotas.get("/categoria", listarCategorias);
rotas.get("/transacao", listarTransacoes);
rotas.post("/transacao", cadastrarTransacao);
rotas.put("/transacao/:id", atualizarTransacao);
rotas.delete("/transacao/:id", excluirTransacao);
rotas.get("/transacao/extrato", exibirExtrato);
rotas.get("/transacao/:id", detalharTransacao);

module.exports = rotas;
