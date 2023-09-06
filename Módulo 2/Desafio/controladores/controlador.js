const {
  depositos,
  transferencias,
  saques,
  contas,
} = require("../bancodedados");

const {
  verificarEntradas,
  seAContaExiste,
  verificarEmailouCPF,
  gerarNumeroNovaConta,
  buscarIndiceDaConta,
  verificarValorDaTransacao,
  registrarDataEHora,
} = require("../funcoes/funcoes");

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

  const obterNumeroParaNovaConta = gerarNumeroNovaConta();

  const validarEntradas = verificarEntradas(
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha
  );

  if (!validarEntradas) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const cpfEEmail = verificarEmailouCPF(cpf, email);

  if (!cpfEEmail) {
    return res.status(400).json({ mensagem: "CPF ou E-mail já cadastrado." });
  }

  const novaConta = {
    numero: obterNumeroParaNovaConta,
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

  const validarEntradas = verificarEntradas(
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha
  );

  if (!validarEntradas) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const contaExiste = seAContaExiste(numeroConta);

  if (!contaExiste) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  const cpfEEmail = verificarEmailouCPF(cpf, email);

  if (!cpfEEmail) {
    return res.status(400).json({ mensagem: "CPF ou E-mail já cadastrado." });
  }

  contaExiste.usuario.nome = nome;
  contaExiste.usuario.cpf = cpf;
  contaExiste.usuario.data_nascimento = data_nascimento;
  contaExiste.usuario.telefone = telefone;
  contaExiste.usuario.email = email;
  contaExiste.usuario.senha = senha;

  return res.status(200).json();
};

const excluirContaBancaria = (req, res) => {
  const { numeroConta } = req.params;

  const indice = buscarIndiceDaConta(numeroConta);

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

  const transacao = verificarValorDaTransacao(valor);

  if (!transacao) {
    return res.status(400).json({
      mensagem: "O valor do depósito não pode ser zero ou negativo.",
    });
  }

  const validarEntradas = verificarEntradas(numero_conta, valor);

  if (!validarEntradas) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const indice = buscarIndiceDaConta(numero_conta);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  contas[indice].saldo = contas[indice].saldo + Number(valor);

  const dataEHora = registrarDataEHora();

  const deposito = {
    data: dataEHora,
    numero_conta,
    valor,
  };

  depositos.push(deposito);

  return res.status(200).json();
};

const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  const transacao = verificarValorDaTransacao(valor);

  if (!transacao) {
    return res.status(400).json({
      mensagem: "O valor do depósito não pode ser zero ou negativo.",
    });
  }

  const validarEntradas = verificarEntradas(numero_conta, valor, senha);

  if (!validarEntradas) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const indice = buscarIndiceDaConta(numero_conta);

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

  const dataEHora = registrarDataEHora();

  const saque = {
    data: dataEHora,
    numero_conta,
    valor,
  };

  saques.push(saque);

  return res.status(200).json();
};

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  const transacao = verificarValorDaTransacao(valor);

  if (!transacao) {
    return res.status(400).json({
      mensagem: "O valor do depósito não pode ser zero ou negativo.",
    });
  }

  const validarEntradas = verificarEntradas(
    numero_conta_origem,
    numero_conta_destino,
    valor,
    senha
  );

  if (!validarEntradas) {
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

  const dataEHora = registrarDataEHora();

  const transferir = {
    data: dataEHora,
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  transferencias.push(transferir);

  return res.status(200).json();
};

const saldo = (req, res) => {
  const { numero_conta, senha } = req.query;

  const validarEntradas = verificarEntradas(numero_conta, senha);

  if (!validarEntradas) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const indice = buscarIndiceDaConta(numero_conta);

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

  const validarEntradas = verificarEntradas(numero_conta, senha);

  if (!validarEntradas) {
    return res.status(400).json({
      mensagem: "Todos os campos devem ser preenchidos.",
    });
  }

  const indice = buscarIndiceDaConta(numero_conta);

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
