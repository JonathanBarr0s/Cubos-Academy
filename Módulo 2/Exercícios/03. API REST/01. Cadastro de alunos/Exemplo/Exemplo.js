const express = require("express");

const app = express();
const porta = 3000;
app.use(express.json());

//banco de dados
let ids = 3;
const alunos = [
  {
    id: 1,
    nome: "Marcos",
    sobrenome: "Silveira",
    idade: 36,
    curso: "Programação do Zero",
  },
  {
    id: 2,
    nome: "Jonathan",
    sobrenome: "Barros",
    idade: 18,
    curso: "Back-end",
  },
];

//intermediários
const validarsenha = (req, res, next) => {
  const { senha } = req.query;

  if (!senha) {
    return res.send("Informar a senha.");
  }

  if (senha !== "cubos123") {
    return res.send("A senha está incorreta.");
  }

  next();

};

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
  const { nome, sobrenome, idade, curso } = req.body;

  if (
    !nome.trim() ||
    !sobrenome.trim() ||
    !idade.toString().trim() ||
    !curso.trim()
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem estar preenchidos." });
  }

  if (idade < 18) {
    return res.status(400).json({ mensagem: "Aluno menor de idade." });
  }

  const novoAluno = {
    id: ids,
    nome: nome,
    sobrenome: sobrenome,
    idade: idade,
    curso: curso,
  };
  ids++;

  alunos.push(novoAluno);

  return res.status(201).json(novoAluno);
};

//04
const deletarAluno = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: "O ID deve ser um número válido." });
  }

  if (id > alunos.length) {
    return res.status(400).json({ mensagem: "Aluno não encontrado." });
  }

  alunos.splice(id - 1, 1);

  return res.status(200).json({ mensagem: "Aluno deletado com sucesso." });
};

//index
app.use(validarsenha);

app.get("/alunos", buscardados);
app.get("/aluno/:id", encontrarAluno);
app.post("/aluno", cadastrarAluno);
app.delete("/aluno/:id", deletarAluno);

//listen
app.listen(porta);
