let texto = 'Seu texto aqui'

//código
let textoTrim;

let contadorEspacos = 0;
let ultimoCaracter = 0;

if (!texto) {
  console.log(0);
} else {
  textoTrim = texto.trim();
  for (const i of textoTrim) {
    if (i === " " && i !== ultimoCaracter) {
      contadorEspacos++;
    }
    ultimoCaracter = i;
  }

  console.log(contadorEspacos + 1);
}
