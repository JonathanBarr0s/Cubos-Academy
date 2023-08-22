let min = 0;
let seg = 55;
let saida

function cronometro(numero) {
  if (seg === 60) {
    min++;
    seg = 0;
  }
  saida = `Tempo atual do cronômetro: ${min.toString().padStart(2, '0')} minutos e ${seg.toString().padStart(2, '0')} segundos`
  console.log(saida);
  setTimeout(() => cronometro(), 1000);
  seg++;
}

cronometro();
