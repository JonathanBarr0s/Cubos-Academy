const bancodedados = require("../bancodedados");
const { livros } = require("../bancodedados");
const { indice } = require("../bancodedados");

const buscarlivros = (req, res) => {
  return res.status(200).json(livros);
};

const buscarlivro = (req, res) => {
  const { id } = req.params;

  const buscarlivro = livros.filter((livro) => {
    return livro.id === Number(id);
  });

  if (typeof id !== "number" && isNaN(Number(id))) {
    return res.status(400).json({
      mensagem: "O valor do parâmetro ID da URL não é um número válido.",
    });
  }

  if (buscarlivro.length === 0) {
    return res.status(404).json({
      mensagem: "Não existe livro para o ID informado.",
    });
  }

  return res.status(200).json(buscarlivro);
};

const adicionarlivro = (req, res) => {
  const { titulo, autor, ano, numPaginas } = req.body;

  const novolivro = {
    id: indice,
    titulo,
    autor,
    ano,
    numPaginas,
  };

  livros.push(novolivro);

  return res.status(201).json({ mensagem: "Livro adicionado com sucesso." });
};

module.exports = {
  buscarlivros,
  buscarlivro,
  adicionarlivro,
};
