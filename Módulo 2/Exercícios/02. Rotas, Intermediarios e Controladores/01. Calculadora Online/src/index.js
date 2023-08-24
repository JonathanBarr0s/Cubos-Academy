const express = require("express");
const app = express();
const porta = 3000;

let resultado;

app.get("/somar", (req, res) => {
  const { num1: parametroNum1, num2: parametroNum2 } = req.query;

  if (parametroNum1 && parametroNum2) {
    resultado = Number(parametroNum1) + Number(parametroNum2);
    res.send(resultado.toString());
  }
});

app.get("/subtrair", (req, res) => {
  const { num1: parametroNum1, num2: parametroNum2 } = req.query;

  if (parametroNum1 && parametroNum2) {
    resultado = Number(parametroNum1) - Number(parametroNum2);
    res.send(resultado.toString());
  }
});

app.get("/multiplicar", (req, res) => {
  const { num1: parametroNum1, num2: parametroNum2 } = req.query;

  if (parametroNum1 && parametroNum2) {
    resultado = Number(parametroNum1) * Number(parametroNum2);
    res.send(resultado.toString());
  }
});

app.get("/dividir", (req, res) => {
  const { num1: parametroNum1, num2: parametroNum2 } = req.query;

  if (parametroNum1 && parametroNum2 && parametroNum2 !== "0") {
    resultado = Number(parametroNum1) / Number(parametroNum2);
    res.send(resultado.toString());
  } else if (parametroNum1 && parametroNum2 && parametroNum2 === "0") {
    resultado = "Não é possível dividir por zero.";
    res.send(resultado.toString());
  }
});

app.listen(porta);
