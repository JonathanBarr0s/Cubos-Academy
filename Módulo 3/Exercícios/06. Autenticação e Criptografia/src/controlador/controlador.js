const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  try {
    const usuario = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuario.rowCount < 1) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: senhaSistema });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, "senha123", {
      expiresIn: "8h",
    });

    const { senha: _, ...usuarioLogado } = usuario.rows[0];

    return res.json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await pool.query(
      "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *",
      [nome, email, senhaCriptografada]
    );

    return res.status(201).json(novoUsuario.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const cadastrarPokemon = async (req, res) => {
  const { nome, habilidades, imagem, apelido } = req.body;

  if (!nome || !habilidades) {
    return res
      .status(400)
      .json({ mensagem: "Os campos nome e habilidades são obrigatórios." });
  }

  try {
    const novoPokemon = await pool.query(
      "insert into pokemons (nome, habilidades, imagem, apelido) values ($1, $2, $3, $4) returning *",
      [nome, habilidades, imagem, apelido]
    );

    return res.status(201).json(novoPokemon.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const atualizarApelidoPokemon = async (req, res) => {
  const { apelido } = req.body;
  const { id } = req.params;

  try {
    const atualizarApelidoPokemon = await pool.query(
      "update pokemons set apelido = $1 where id = $2",
      [apelido, id]
    );
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const listarPokemons = async (req, res) => {
  try {
    console.log(req.usuario);
    const resultado = await pool.query("SELECT * FROM pokemons order by id");
    return res.status(200).json(resultado.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const filtrarPokemon = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query("select * from pokemons where id = $1", [
      id,
    ]);
    return res.status(200).json(resultado.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const deletarPokemon = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query("delete from pokemons where id = $1", [
      id,
    ]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  cadastrarPokemon,
  atualizarApelidoPokemon,
  listarPokemons,
  filtrarPokemon,
  deletarPokemon,
};
