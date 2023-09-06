const {
  depositos,
  transferencias,
  saques,
  contas,
} = require("../bancodedados");

const { format } = require("date-fns");

const verificarEntradas = (...parametros) => {
  for (const parametro of parametros) {
    if (parametro === undefined) {
      return false;
    }
  }
  return true;
};

const seAContaExiste = (params) => {
  const contaEncontrada = contas.find(
    (atualizarDados) => atualizarDados.numero === params
  );
  if (contaEncontrada) {
    return contaEncontrada;
  } else {
    return false;
  }
};

const verificarEmailouCPF = (cpf, email) => {
  for (const conta of contas) {
    if (conta.usuario.cpf === cpf || conta.usuario.email === email) {
      return false;
    }
  }
  return true;
};

const gerarNumeroNovaConta = () => {
  let numeroDaNovaConta = 0;

  for (const conta of contas) {
    if (conta.numero > numeroDaNovaConta) {
      numeroDaNovaConta = Number(conta.numero);
    }
  }

  numeroDaNovaConta++;
  numeroDaNovaConta = numeroDaNovaConta.toString();
  return numeroDaNovaConta;
};

const buscarIndiceDaConta = (params) => {
  const indice = contas.findIndex((conta) => conta.numero === params);
  return indice;
};

const verificarValorDaTransacao = (params) => {
  if (params <= 0) {
    return false;
  } else {
    return true;
  }
};

const registrarDataEHora = () => {
  const dataHoraAtual = new Date();
  const dataHoraFormatada = format(dataHoraAtual, "yyyy-MM-dd HH:mm:ss");
  return dataHoraFormatada;
};

module.exports = {
  verificarEntradas,
  seAContaExiste,
  verificarEmailouCPF,
  gerarNumeroNovaConta,
  buscarIndiceDaConta,
  verificarValorDaTransacao,
  registrarDataEHora,
};
