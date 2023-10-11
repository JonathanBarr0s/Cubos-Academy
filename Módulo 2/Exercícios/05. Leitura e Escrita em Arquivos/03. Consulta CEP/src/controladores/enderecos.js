const { buscarEndereco } = require('utils-playground');
const fs = require('fs/promises');

const gerenciarEndereco = async (req, res) => {
    const { cep } = req.params;

    try {
        const enderecos = JSON.parse(await fs.readFile('./src/enderecos.json'));

        let endereco = enderecos.find(endereco => endereco.cep.replace('-', '') === cep);

        if (endereco) {
            return res.json(endereco);
        }

        endereco = await buscarEndereco(cep);

        if (endereco.erro) {
            return res.status(404).json({ mensagem: 'Endereço não encontrado.' });
        }

        enderecos.push(endereco);

        await fs.writeFile('./src/enderecos.json', JSON.stringify(enderecos));

        return res.json(endereco);
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

module.exports = {
    gerenciarEndereco
}