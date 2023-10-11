const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "peedro21",
  database: "final",
});

module.exports = pool;
