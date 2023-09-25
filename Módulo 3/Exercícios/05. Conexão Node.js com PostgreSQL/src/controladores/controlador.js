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

        if (isNaN(autorId)) {
            return res.status(400).json({ mensagem: 'ID de autor inválido.' });
        }

        const query = `
            SELECT autores.id AS autor_id, autores.nome AS autor_nome, autores.idade AS autor_idade, 
            livros.id AS livro_id, livros.nome AS livro_nome, livros.genero AS livro_genero, 
            livros.editora AS livro_editora, livros.data_publicacao AS livro_data_publicacao 
            FROM autores
            LEFT JOIN livros ON autores.id = livros.autor_id
            WHERE autores.id = $1
        `;
        const values = [autorId];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Autor não encontrado.' });
        }

        const autor = {
            id: result.rows[0].autor_id,
            nome: result.rows[0].autor_nome,
            idade: result.rows[0].autor_idade,
            livros: [],
        };

        result.rows.forEach((row) => {
            if (row.livro_id) {
                autor.livros.push({
                    id: row.livro_id,
                    nome: row.livro_nome,
                    genero: row.livro_genero,
                    editora: row.livro_editora,
                    data_publicacao: row.livro_data_publicacao,
                });
            }
        });

        res.json(autor);
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

const buscarLivro = async (req, res) => {
    try {
        const query = `
            SELECT livros.id AS livro_id, livros.nome AS livro_nome, livros.genero AS livro_genero, 
            livros.editora AS livro_editora, livros.data_publicacao AS livro_data_publicacao, 
            autores.id AS autor_id, autores.nome AS autor_nome, autores.idade AS autor_idade
            FROM livros
            LEFT JOIN autores ON livros.autor_id = autores.id
        `;

        const result = await pool.query(query);

        const livros = result.rows.map((row) => ({
            id: row.livro_id,
            nome: row.livro_nome,
            genero: row.livro_genero,
            editora: row.livro_editora,
            data_publicacao: row.livro_data_publicacao,
            autor: {
                id: row.autor_id,
                nome: row.autor_nome,
                idade: row.autor_idade,
            },
        }));

        res.json(livros);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { cadastroAutor, buscarUmAutor, cadastroLivro, buscarLivro, };