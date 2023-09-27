const express = require("express");
const controlador = require("./controlador/controlador");
const verificarUsuarioLogado = require("./intermediario/intermediario");

const rotas = express();

rotas.post("/usuario", controlador.cadastrarUsuario);
rotas.post("/login", controlador.login);

rotas.use(verificarUsuarioLogado);

rotas.post("/pokemon", controlador.cadastrarPokemon);
rotas.put("/apelido/:id", controlador.atualizarApelidoPokemon);
rotas.get("/", controlador.listarPokemons);
rotas.get("/:id", controlador.filtrarPokemon);
rotas.delete("/:id", controlador.deletarPokemon);

module.exports = rotas;
