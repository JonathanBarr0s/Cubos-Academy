function processData(input) {
  let palavra = input;
  let tamanhoPalavra = palavra.length;
  let primeiraLetraMaiuscula = false;
  let maiusculaNoRestoDaPalavra = false;
  let primeiraLetra = palavra[0];
  let restoPalavra = palavra.slice(1, tamanhoPalavra);
  let saida;

  if (primeiraLetra === primeiraLetra.toUpperCase()) {
    primeiraLetraMaiuscula = true;
  }

  for (let i of restoPalavra) {
    if (i === i.toUpperCase()) {
      maiusculaNoRestoDaPalavra = true;
      break;
    }
  }

  if (primeiraLetraMaiuscula === true && maiusculaNoRestoDaPalavra === true) {
    saida = primeiraLetra.toLowerCase() + restoPalavra.toLowerCase();
    console.log(saida);
  } else if (
    primeiraLetraMaiuscula === false &&
    maiusculaNoRestoDaPalavra === false
  ) {
    saida = palavra;
    console.log(saida);
  } else if (
    primeiraLetraMaiuscula === true &&
    maiusculaNoRestoDaPalavra === false
  ) {
    saida = palavra;
    console.log(saida);
  } else if (
    primeiraLetraMaiuscula === false &&
    maiusculaNoRestoDaPalavra === true
  ) {
    saida = primeiraLetra.toUpperCase() + restoPalavra.toLowerCase();
    console.log(saida);
  }
}

processData("cAPS");
processData("lock");
processData("CAPS");
