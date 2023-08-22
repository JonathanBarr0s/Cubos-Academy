const express = require("express");
const app = express();

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
let jogador = 0;

app.get("/", (req, res) => {
    if (jogador > 4) {
        jogador = 0
    }
    res.send(`É a vez de ${jogadores[jogador]} jogar!`);
    jogador = jogador + 1;
});

console.log(jogador);

app.listen(3000, () => {
  console.log("Servidor iniciado.");
});
