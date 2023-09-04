const { produtos } = require("../bancodedados");
const { getStateFromZipcode } = require("utils-playground");

const buscarprodutos = (req, res) => {
  return res.json(produtos);
};

const buscarproduto = (req, res) => {
  const { id } = req.params;

  const produtoEncontrado = produtos.find((produto) => {
    return produto.id === Number(id);
  });

  return res.status(200).json(produtoEncontrado);
};

const buscarprodutocep = (req, res) => {
  const { id, cep } = req.params;

  const produtoEncontrado = produtos.find((produto) => {
    return produto.id === Number(id);
  });

  const estadoEncontrado = getStateFromZipcode(cep).then((estado) => {
    return estado;
  });

  let frete;

  if (estadoEncontrado === "BA" || "SE" || "AL" || "PE" || "PB") {
    frete = produtoEncontrado.valor * 0.1;
  } else if (estadoEncontrado === "SP" || "RJ") {
    frete = produtoEncontrado.valor * 0.15;
  }

  const resposta = {
    produto: produtoEncontrado,
    estado: estadoEncontrado,
    frete: frete,
  };

  return res.status(200).json(resposta);
};

module.exports = {
  buscarprodutos,
  buscarproduto,
  buscarprodutocep,
};
