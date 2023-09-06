const express = require("express");
const controlador = require("./controladores/controlador");

const rotasUsuario = express();
const rotasBanco = express();

rotasBanco.get("/contas", controlador.listarTodasAsContas);
rotasUsuario.get("/contas/saldo", controlador.saldo);
rotasUsuario.get("/contas/extrato", controlador.extrato);
rotasUsuario.post("/contas", controlador.criarcontabancaria);
rotasUsuario.post("/transacoes/depositar", controlador.depositar);
rotasUsuario.post("/transacoes/sacar", controlador.sacar);
rotasUsuario.post("/transacoes/transferir", controlador.transferir);
rotasUsuario.put(
  "/contas/:numeroConta/usuario",
  controlador.atualizarContaBancaria
);
rotasUsuario.delete("/contas/:numeroConta", controlador.excluirContaBancaria);

module.exports = { rotasUsuario, rotasBanco };
