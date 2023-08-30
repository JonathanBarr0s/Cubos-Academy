const express = require("express");

const app = express();
const porta = 3000;

//banco de dados
let ids = 2;
const alunos = [
  {
    id: 1,
    nome: "Marcos",
    sobrenome: "Silveira",
    idade: 36,
    curso: "Programação do Zero",
  },
];

//controladores
//01
const buscardados = (req, res) => {
  res.status(200).json(alunos);
};

//02
const encontrarAluno = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: "O ID deve ser um número válido." });
  }

  const aluno = alunos.find((aluno) => {
    return aluno.id === Number(id);
  });

  if (!aluno) {
    return res.status(404).json({ mensagem: "Aluno não encontrado." });
  }

  return res.status(200).json(aluno);
};

//03
const cadastrarAluno = (req, res) => {

}

//index
app.get("/alunos", buscardados);
app.get("/aluno/:id", encontrarAluno);
app.post("/alunos", cadastrarAluno);

//listen
app.listen(porta);
