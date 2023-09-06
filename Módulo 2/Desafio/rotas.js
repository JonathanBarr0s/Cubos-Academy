const express = require("express");
const controlador = require("./controladores/controlador");

const rotas = express();

rotas.get("/contas", controlador.listarTodasAsContas);
rotas.get("/contas/saldo", controlador.saldo);
rotas.post("/contas", controlador.criarcontabancaria);
rotas.post("/transacoes/depositar", controlador.depositar);
rotas.post("/transacoes/sacar", controlador.sacar);
rotas.post("/transacoes/transferir", controlador.transferir);
rotas.put("/contas/:numeroConta/usuario", controlador.atualizarContaBancaria);
rotas.delete("/contas/:numeroConta", controlador.excluirContaBancaria);

module.exports = rotas;
