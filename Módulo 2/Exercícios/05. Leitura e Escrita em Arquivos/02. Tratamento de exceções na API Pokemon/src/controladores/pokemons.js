const { listarPokemons, detalharPokemon } = require('utils-playground');

const pokemons = async (req, res) => {
    const { pagina } = req.query;

    try {
        const listaPokemons = await listarPokemons(pagina ?? 1);

        return res.json(listaPokemons);
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message })
    }
}

const pokemon = async (req, res) => {
    const { idOuNome } = req.params;

    try {
        const pokemonEcontrado = await detalharPokemon(idOuNome);

        const { id, name, height, weight, base_experience, forms, abilities, species } = pokemonEcontrado;

        return res.json({ id, name, height, weight, base_experience, forms, abilities, species });
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message })
    }
}

module.exports = {
    pokemons,
    pokemon
}