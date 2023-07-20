const rendaMensalEmCentavos = 400000;

// Tempo decorrido de contrato. Se for maior que 60 meses, o aluno não deve mais nada.
const mesesDecorridos = 60;

/* 
Soma das parcelas já pagas pelo aluno nos meses anteriores (em centavos). 
Se for igual a 18 mil reais, o aluno não deve pagar mais nada,
pois já quitou a dívida.
*/
const totalJaPagoPeloAluno = 1700000;

const valorParcela = (rendaMensalEmCentavos * 0.18) / 100

if (
    (rendaMensalEmCentavos <= 200000) ||
    (mesesDecorridos > 60) ||
    (totalJaPagoPeloAluno >= 1800000)
) {
    console.log("O valor da parcela desse mês é de R$ 0 reais.");
} else {
    console.log(`O valor da parcela desse mês é de R$ ${valorParcela} reais.`);
}