const pool = require('../conexao')

const cadastroAutor = async (req, res) => {
    try {
        const { nome, idade } = req.body;

        if (!nome) {
            return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
        }

        const query = 'INSERT INTO autores (nome, idade) VALUES ($1, $2) RETURNING id';
        const values = [nome, idade];

        const result = await pool.query(query, values);

        res.status(201).json({
            id: result.rows[0].id,
            nome,
            idade,
        });
    } catch (error) {
        console.log(error.message);
    }
};

const buscarUmAutor = async (req, res) => {
    try {
        const autorId = parseInt(req.params.id);

        const query = 'SELECT * FROM autores WHERE id = $1';
        const values = [autorId];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Autor não encontrado.' });
        }

        const autor = result.rows[0];

        res.json({
            id: autor.id,
            nome: autor.nome,
            idade: autor.idade,
        });
    } catch (error) {
        console.log(error.message);
    }
};

cadastroLivro = async (req, res) => {
    try {
        const autorId = parseInt(req.params.id);
        const { nome, genero, editora, data_publicacao } = req.body;

        if (!nome || !genero || !editora || !data_publicacao) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }

        const autorQuery = 'SELECT * FROM autores WHERE id = $1';
        const autorResult = await pool.query(autorQuery, [autorId]);

        if (autorResult.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Autor não encontrado.' });
        }

        const livroQuery = `
            INSERT INTO livros (nome, genero, editora, data_publicacao, autor_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        const livroValues = [nome, genero, editora, data_publicacao, autorId];

        const result = await pool.query(livroQuery, livroValues);

        res.status(201).json({
            id: result.rows[0].id,
            nome,
            genero,
            editora,
            data_publicacao,
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    cadastroAutor,
    buscarUmAutor,
    cadastroLivro,
};