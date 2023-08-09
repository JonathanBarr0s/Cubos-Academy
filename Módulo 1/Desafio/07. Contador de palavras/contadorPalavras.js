let texto = 'jonathan'

//código
let contadorEspacos = 0;
let ultimoCaracter = 0;

if (texto !== "") {
  const textoSemEspacosInicioEFim = texto.trim();
}

if (texto === "") {
  console.log(0);
} else {
  for (const i of textoSemEspacosInicioEFim) {
    if (i === " " && i !== ultimoCaracter) {
      contadorEspacos++;
    }
    ultimoCaracter = i;
  }

  console.log(contadorEspacos + 1);
}
