const express = require("express");
const app = express();

let min = 0;
let seg = 0;

let tempoAtual = "Tempo atual do cronômetro: 00 minutos e 00 segundos";
let intervalId;

function cronometro() {
  seg++;
  if (seg === 60) {
    min++;
    seg = 0;
  }
  tempoAtual = `Tempo atual do cronômetro: ${min
    .toString()
    .padStart(2, "0")} minutos e ${seg.toString().padStart(2, "0")} segundos`;
}

app.get("/", (req, res) => {
  res.send(tempoAtual);
});

app.get("/iniciar", (req, res) => {
  intervalId = setInterval(cronometro, 1000);
  res.send("Cronômetro iniciado!");
});

app.get("/pausar", (req, res) => {
  clearInterval(intervalId);
  intervalId = null;
  res.send("Cronômetro pausado!");
});

app.get("/zerar", (req, res) => {
  min = 0;
  seg = 0;
  res.send("Cronômetro zerado!");
});

app.listen(8000, () => {
  console.log("Servidor iniciado.");
});
