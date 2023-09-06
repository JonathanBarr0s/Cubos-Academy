const { depositos } = require("../bancodedados");
const { transferencias } = require("../bancodedados");
const { saques } = require("../bancodedados");
const { contas } = require("../bancodedados");
const { format } = require("date-fns");

const listarTodasAsContas = (req, res) => {
  if (contas.length === 0) {
    return res.status(404).json({
      mensagem: "Nenhuma conta bancária foi encontrada.",
    });
  } else {
    return res.status(200).json(contas);
  }
};

const criarcontabancaria = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  let numeroDaNovaConta = 0;

  for (const conta of contas) {
    if (conta.numero > numeroDaNovaConta) {
      numeroDaNovaConta = Number(conta.numero);
    }
  }

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  for (const conta of contas) {
    if (conta.usuario.cpf === cpf || conta.usuario.email === email) {
      return res.status(501).json({ mensagem: "CPF ou E-mail já cadastrado." });
    }
  }

  numeroDaNovaConta++;
  numeroDaNovaConta = numeroDaNovaConta.toString();

  const novaConta = {
    numero: numeroDaNovaConta,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };
  contas.push(novaConta);

  return res.status(201).json();
};

const atualizarContaBancaria = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const { numeroConta } = req.params;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const usuarioExistente = contas.find(
    (atualizarDados) => atualizarDados.numero === numeroConta
  );

  if (!usuarioExistente) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  for (const conta of contas) {
    if (conta.usuario.cpf === cpf || conta.usuario.email === email) {
      return res.status(501).json({ mensagem: "CPF ou E-mail já cadastrado." });
    }
  }

  usuarioExistente.usuario.nome = nome;
  usuarioExistente.usuario.cpf = cpf;
  usuarioExistente.usuario.data_nascimento = data_nascimento;
  usuarioExistente.usuario.telefone = telefone;
  usuarioExistente.usuario.email = email;
  usuarioExistente.usuario.senha = senha;

  return res.status(200).json();
};

const excluirContaBancaria = (req, res) => {
  const { numeroConta } = req.params;

  const indice = contas.findIndex((conta) => conta.numero === numeroConta);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  if (contas[indice].saldo !== 0) {
    return res.status(400).json({
      mensagem: "A conta só pode ser removida se o saldo for zero!",
    });
  }

  contas.splice(indice, 1);

  return res.status(200).json();
};

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  if (valor <= 0) {
    return res.status(400).json({
      mensagem: "O valor do depósito não pode ser zero ou negativo.",
    });
  }

  if (!numero_conta || !valor) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  if (Number(valor) <= 0) {
    return res.status(400).json({
      mensagem: "Não é possível depositar valores negativos ou zerados.",
    });
  }

  const indice = contas.findIndex((conta) => conta.numero === numero_conta);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  contas[indice].saldo = contas[indice].saldo + Number(valor);

  const dataHoraAtual = new Date();
  const dataHoraFormatada = format(dataHoraAtual, "yyyy-MM-dd HH:mm:ss");

  const deposito = {
    data: dataHoraFormatada,
    numero_conta,
    valor,
  };

  depositos.push(deposito);

  return res.status(200).json();
};

const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  if (valor <= 0) {
    return res.status(400).json({
      mensagem: "O valor do saque não pode ser zero ou negativo.",
    });
  }

  if (!numero_conta || !valor || !senha) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const indice = contas.findIndex((conta) => conta.numero === numero_conta);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  if (contas[indice].usuario.senha !== senha) {
    return res
      .status(403)
      .json({ mensagem: "A senha informada está incorreta." });
  }

  if (contas[indice].saldo < valor) {
    return res.status(403).json({ mensagem: "Saldo insuficiente." });
  }

  contas[indice].saldo = contas[indice].saldo - Number(valor);

  const dataHoraAtual = new Date();
  const dataHoraFormatada = format(dataHoraAtual, "yyyy-MM-dd HH:mm:ss");

  const saque = {
    data: dataHoraFormatada,
    numero_conta,
    valor,
  };

  saques.push(saque);

  return res.status(200).json();
};

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (valor <= 0) {
    return res.status(400).json({
      mensagem: "O valor da transferência não pode ser zero ou negativo.",
    });
  }

  if (!numero_conta_origem || !valor || !senha || !numero_conta_destino) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const indiceOrigem = contas.findIndex(
    (conta) => conta.numero === numero_conta_origem
  );

  if (indiceOrigem === -1) {
    return res.status(404).json({ mensagem: "Conta origem não encontrada." });
  }

  const indiceDestino = contas.findIndex(
    (conta) => conta.numero === numero_conta_destino
  );

  if (indiceDestino === -1) {
    return res.status(404).json({ mensagem: "Conta destino não encontrada." });
  }

  if (contas[indiceOrigem].usuario.senha !== senha) {
    return res
      .status(403)
      .json({ mensagem: "A senha informada está incorreta." });
  }

  if (contas[indiceOrigem].saldo < valor) {
    return res.status(403).json({ mensagem: "Saldo insuficiente." });
  }

  contas[indiceOrigem].saldo = contas[indiceOrigem].saldo - Number(valor);
  contas[indiceDestino].saldo = contas[indiceDestino].saldo + Number(valor);

  const dataHoraAtual = new Date();
  const dataHoraFormatada = format(dataHoraAtual, "yyyy-MM-dd HH:mm:ss");

  const transferir = {
    data: dataHoraFormatada,
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  transferencias.push(transferir);

  return res.status(200).json();
};

const saldo = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(400).json({
      mensagem:
        "É necessário informar o número da conta e a senha corretamente.",
    });
  }

  const indice = contas.findIndex((conta) => conta.numero === numero_conta);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  if (contas[indice].usuario.senha !== senha) {
    return res
      .status(403)
      .json({ mensagem: "A senha informada está incorreta." });
  }

  const saldo = contas[indice].saldo;

  return res.status(200).json({
    saldo,
  });
};

const extrato = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(400).json({
      mensagem:
        "É necessário informar o número da conta e a senha corretamente.",
    });
  }

  const indice = contas.findIndex((conta) => conta.numero === numero_conta);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  if (contas[indice].usuario.senha !== senha) {
    return res
      .status(403)
      .json({ mensagem: "A senha informada está incorreta." });
  }

  const saida = {
    depositos: depositos.filter((deposito) => {
      return deposito.numero_conta === numero_conta;
    }),
    saques: saques.filter((saque) => {
      return saque.numero_conta === numero_conta;
    }),
    transferenciasEnviadas: transferencias.filter((transferencia) => {
      return transferencia.numero_conta_origem === numero_conta;
    }),
    transferenciasRecebidas: transferencias.filter((transferencia) => {
      return transferencia.numero_conta_destino === numero_conta;
    }),
  };

  return res.status(200).json(saida);
};

module.exports = {
  listarTodasAsContas,
  criarcontabancaria,
  atualizarContaBancaria,
  excluirContaBancaria,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato,
};
