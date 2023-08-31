const bancodedados = require("../bancodedados");
const { convidados } = require("../bancodedados");

const buscarconvidados = (req, res) => {
  return res.json(convidados);
};

const buscarconvidado = (req, res) => {
  const { nome } = req.query;
  const buscar = convidados.find((convidado) => {
    return convidado === nome;
  });

  if (buscar === undefined) {
    return res.status(201).json({
      mensagem: "O convidado buscado não está presente na lista.",
    });
  }

  return res.status(201).json({
    mensagem: "Convidado presente.",
  });
};

const novoconvidado = (req, res) => {
  const { nome } = req.body;

  const novoconvidado = nome;

  if (convidados.includes(nome)) {
    return res.status(201).json({
      mensagem:
        "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também.",
    });
  } else {
    bancodedados.convidados.push(novoconvidado);

    return res.status(201).json({
      mensagem: "Convidado adicionado.",
    });
  }
};

const removerconvidado = (req, res) => {
  const { nome } = req.params;

  if (convidados.includes(nome)) {
    const removerconvidado = convidados.indexOf(nome);
    convidados.splice(removerconvidado, 1);

    return res.status(201).json({
      mensagem: "Convidado removido.",
    });
  } else {
    return res.status(201).json({
      mensagem:
        "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido.",
    });
  }
};

module.exports = {
  buscarconvidados,
  buscarconvidado,
  novoconvidado,
  removerconvidado,
};
