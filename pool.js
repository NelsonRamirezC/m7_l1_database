const {Pool} = require('pg'); 

const pool = new Pool({
    host: 'localhost',
    user: 'node',
    database: "m7_usuarios",
    password: '123456',
    port:5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 1000,
  })

  const getUsers = async () => {
    let usuarios = await pool.query("SELECT * FROM usuarios");
    return usuarios.rows;
  }

  const getUserById = async (id) => {
    let usuarios = await pool.query(`SELECT * FROM usuarios where id = ${id}`);
    return usuarios.rows;
  }


  module.exports = {
    getUsers,
    getUserById
  }