const numeros = [0, 0, 0, 0];

//código
let soma = 0;

for (let i of numeros) {
  soma = soma + i;
}

if (soma > numeros.length) {
  let repeticao = Math.trunc(soma / numeros.length);
  let encontrandoIndice = soma - numeros.length * repeticao;
  console.log(encontrandoIndice);
} else {
  console.log(soma);
}
