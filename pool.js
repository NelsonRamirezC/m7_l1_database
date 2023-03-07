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
    let consulta = "SELECT * FROM usuarios where id = $1";
    let values = [id]
    let usuarios = await pool.query(consulta, values);
    return usuarios.rows;
  }

  const addUser = async (usuario) => {
    let consulta = "INSERT INTO usuarios(nombre, apellido, rut, email, password) VALUES($1, $2, $3, $4, $5)"
    let values = [usuario.nombre, usuario.apellido, usuario.rut, usuario.email, usuario.password];
    //let values = Object.values(usuarios)
    let usuarios = await pool.query(consulta, values);
    return usuarios.rows;
  }

  const updateUser = async (usuario) => {
    let consulta = ""
    let values = [usuario.id, usuario.nombre, usuario.apellido, usuario.rut, usuario.email, usuario.password];
    let usuarios = await pool.query(consulta, values);
    return usuarios.rows;
  }
  


  module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser
  }