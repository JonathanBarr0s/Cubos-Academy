const texto = "Texto   com   múltiplos     espaços";

//código
let textoTratado = "";
let espaco = false;

for (let i of texto.trim()) {
  if (i === " " && espaco) {
  } else if (i === " ") {
    textoTratado = textoTratado + i;
    espaco = true;
  } else {
    textoTratado = textoTratado + i;
    espaco = false;
  }
}

let arrayTexto = textoTratado.split(" ");
let palavras = arrayTexto.length;

console.log(palavras);
