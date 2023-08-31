const express = require("express");
const alunos = require("./controladores/alunos");
const { validarsenha } = require("./intermediarios");

const rotas = express();

rotas.use(validarsenha);

rotas.get("/alunos", alunos.buscardados);
rotas.get("/aluno/:id", alunos.encontrarAluno);
rotas.post("/aluno", alunos.cadastrarAluno);
rotas.delete("/aluno/:id", alunos.deletarAluno);

module.exports = rotas;
