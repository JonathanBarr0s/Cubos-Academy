const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123",
  database: "conexão_nodejs_com_postgresql",
});

module.exports = pool;
