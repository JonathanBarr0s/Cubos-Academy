let produtoIgual = false;
let quantidade = 0;
let total = 0;

//Novo Produto
const novaBermuda = {
    id: 2,
    nome: "Bermuda",
    qtd: 3,
    precoUnit: 5000
}

const carrinho = {
    nomeDoCliente: "Guido Bernal",
    produtos: [
        {
            id: 1,
            nome: "Camisa",
            qtd: 3,
            precoUnit: 3000
        },
        {
            id: 2,
            nome: "Bermuda",
            qtd: 2,
            precoUnit: 5000
        }
    ],
    imprimirResumo: function imprimirResumoDoCarrinho() {
        for (let i of this.produtos) {
            quantidade += i.qtd;
            total = total + (i.qtd * i.precoUnit);
        }

        console.log(`Cliente: ${this.nomeDoCliente}`);
        console.log(`Total de itens: ${quantidade} itens`);
        console.log(`Total de itens: R$ ${total.toFixed(2)}`);
    },
    addProduto: function addProdutoAoCarrinho(carrinho, y) {
        for (let j of carrinho.produtos) {
            if (j.id === y.id) {
                j.qtd = y.qtd;
                produtoIgual = true;
            }
        }
        if (produtoIgual === false) {
            carrinho.produtos.push(y)
        }
    },
    imprimirDetalhes: function imprimirDetalhesDoCarrinho() {
        console.log(`Cliente: ${carrinho.nomeDoCliente}`);
        quantidade = 0;
        total = 0;
        
        for (let k of this.produtos) {
            quantidade += k.qtd;
            total = total + (k.qtd * k.precoUnit);
            
            console.log(`Item ${k.id} - ${k.nome} - ${k.qtd} und - R$ ${k.precoUnit.toFixed(2)}`);
        }
        let item = (quantidade > 1 ? "itens" : "item");
        console.log(`Total de ${item}: ${quantidade}`);
        console.log(`Total a pagar: R$ ${total.toFixed(2)}`);
    }
}

//carrinho.addProduto(carrinho, novaBermuda);
//carrinho.imprimirResumo();

carrinho.imprimirDetalhes()
