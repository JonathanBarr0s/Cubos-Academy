const validarsenha = (req, res, next) => {
  const { senha } = req.query;

  if (!senha) {
    return res.send("Informar a senha.");
  }

  if (senha !== "cubos123") {
    return res.send("A senha está incorreta.");
  }

  next();
};

module.exports = {
  validarsenha, 
};

