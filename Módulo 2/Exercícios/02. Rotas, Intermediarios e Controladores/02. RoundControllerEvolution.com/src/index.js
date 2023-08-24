const express = require("express");
const app = express();
const porta = 8000;

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
let vez = 0;

app.get("/", (req, res) => {
  if (vez > jogadores.length - 1) {
    vez = 0;
    let jogador = jogadores[vez];
    vez++;
    res.send(`É a vez de ${jogador} jogar!`);
  } else {
    let jogador = jogadores[vez];
    vez++;
    res.send(`É a vez de ${jogador} jogar!`);
  }
});

app.get("/remover", (req, res) => {
  const { indice: parametroIndice } = req.query;

  if (jogadores[parametroIndice] === undefined) {
    res.send(
      `Não existe jogador no índice informado (${parametroIndice}) para ser removido.`
    );
  } else {
    jogadores.splice(parametroIndice, 1);
    res.send(jogadores);
  }
});

app.get("/adicionar", (req, res) => {
  let { indice: parametroIndice, nome: parametroNome } = req.query;
  parametroNome =
    parametroNome[0].toUpperCase() + parametroNome.slice(1).toLowerCase();

  if (parametroIndice > (jogadores.length)) {
    res.send(
      `O índice informado (${parametroIndice}) não existe no array. Novo jogador não foi adicionado.`
    );
  } else if (parametroIndice && parametroNome) {
    jogadores.splice(parametroIndice, 0, parametroNome);
    res.send(jogadores);
  } else if (!parametroIndice && parametroNome) {
    const posicao = jogadores.length;
    jogadores.splice(posicao, 0, parametroNome);
    res.send(jogadores);
  }
});

app.listen(porta);
