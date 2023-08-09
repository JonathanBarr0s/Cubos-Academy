function processData(input) {
  let primeiroCaracterMaiusculo = false;
  let proximoCaracterMaiusculo = false;
  let saida = "";

  if (input[0] === input[0].toUpperCase()) {
    primeiroCaracterMaiusculo = true;
  }

  let indice = 0;

  for (let i of input) {
    if (indice !== 0 && i === i.toUpperCase()) proximoCaracterMaiusculo = true;
    indice++;
  }

  if (primeiroCaracterMaiusculo && proximoCaracterMaiusculo) {
    console.log(input.toLowerCase());
  } else if (!primeiroCaracterMaiusculo && !proximoCaracterMaiusculo) {
    console.log(input);
  } else if (primeiroCaracterMaiusculo && !proximoCaracterMaiusculo) {
    console.log(input);
  } else if (!primeiroCaracterMaiusculo && proximoCaracterMaiusculo) {
    let caracter = 0;

    for (let k of input) {
      if (caracter === 0) {
        saida = saida + k.toUpperCase();
        caracter++;
      } else {
        saida = saida + k.toLowerCase();
      }
    }

    console.log(saida);
  }
}

processData("lock");
