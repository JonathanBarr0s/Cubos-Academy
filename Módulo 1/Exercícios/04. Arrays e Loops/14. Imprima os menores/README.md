![](https://i.imgur.com/xG74tOh.png)

# Exercício 14

## Imprima os menores

Considerando que temos dois arrays do mesmo tamanho (mesma quantidade de itens) e que todos os itens de ambos os arrays são números, deveremos, para cada respectiva posição, imprimir o menor valor encontrado entre os dois arrays.

Inicialmente, ambos os arrays terão 5 itens.

#### Exemplo 1:

Para os dois arrays a seguir:

```javascript
const arrayA = [5, 32, 3, 44, 1];
const arrayB = [57, 4, 21, 2, 13];

// seu codigo aqui
```

Deverá ser impresso no console:

```
5
4
3
2
1
```

Pois:

- 5 < 57
- 4 < 32
- 3 < 21
- 2 < 44
- 1 < 13

#### Exemplo 2:

Para os dois arrays a seguir:

```javascript
const arrayA = [1, 3, 3, 44, 11];
const arrayB = [57, 4, 21, 32, 13];

// seu codigo aqui
```

Deverá ser impresso no console:

```
1
3
3
32
11
```

Pois:

- 1 < 57
- 3 < 4
- 3 < 21
- 32 < 44
- 11 < 13

Fique a vontade para testar com outros valores e também para aumentar o tamanho dos arrays desde que eles se mantenham **ambos com o mesmo tamanho**! =)

---

Preencha a checklist para finalizar o exercício:

- [ ] Resolver o exercício revendo a aula se necessário
- [ ] Adicionar as mudanças aos commits (`git add .` para adicionar todos os arquivos, ou `git add nome_do_arquivo` para adicionar um arquivo específico)
- [ ] Commitar a cada mudança significativa ou na finalização do exercício (`git commit -m "Mensagem do commit"`)
- [ ] Pushar os commits na sua branch na origem (`git push origin nome-da-branch`)

###### tags: `lógica` `módulo 1` `exercício de classe` `nodeJS`