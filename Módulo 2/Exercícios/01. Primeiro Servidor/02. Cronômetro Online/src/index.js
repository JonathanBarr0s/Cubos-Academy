const express = require("express");
const app = express();

let min = 0;
let seg = 55;

function cronometro() {
  if (seg === 60) {
    min++;
    seg = 0;
  }
  const tempoAtual = `Tempo atual do cronômetro: ${min.toString().padStart(2, '0')} minutos e ${seg.toString().padStart(2, '0')} segundos`;
  setTimeout(() => {
    seg++;
    cronometro();
  }, 1000);
  return tempoAtual;
}


app.get("/", (req, res) => {
    cronometro();
  const tempoAtual = cronometro(); 
  res.send(tempoAtual);
});

app.listen(8000, () => {
  console.log("Servidor iniciado.");
});
