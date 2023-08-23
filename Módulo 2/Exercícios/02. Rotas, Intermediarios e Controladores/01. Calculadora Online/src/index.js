const express = require("express");
const app = express();
const porta = 3000;

let num1;
let num2;
let resultado;

app.get("/somar", (req, res) => {
  resultado = num1 + num2;
  res.send(resultado);
});

app.listen(porta, () => {
  console.log("Servidor iniciado.");
});
