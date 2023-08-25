const imoveis = require("../bancodedados")

const buscardados = (req, res) => {
  res.send(imoveis);
};

const encontrarImovel = (req, res) => {
  const resultado = imoveis.find((imovel) => {
    return imovel.id === parseInt(req.params.id);
  });
  res.send(resultado);
};

module.exports = { buscardados, encontrarImovel };
