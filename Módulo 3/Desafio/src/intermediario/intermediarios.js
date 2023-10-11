const pool = require("../conexao");
const jwt = require("jsonwebtoken");

const senhaSistema = "senha123";

const verificarUsuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  try {
    const { id } = jwt.verify(token, senhaSistema);

    const { rows, rowCount } = await pool.query(
      "select * from usuarios where id = $1",
      [id]
    );

    req.usuario = rows[0];

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado." });
  }
};

module.exports = verificarUsuarioLogado;
