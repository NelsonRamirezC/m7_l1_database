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
    //id, nombre, apellido, rut, email, password
    let consulta = "UPDATE usuarios SET nombre=$1, apellido=$2, rut=$3, email=$4, password=$5 WHERE id=$6 RETURNING *"
    let values = [usuario.nombre, usuario.apellido, usuario.rut, usuario.email, usuario.password, usuario.id];
    let usuarios = await pool.query(consulta, values);
    console.log(usuarios.rows);
    return usuarios.rows;
  }
  
  const deleteUserById = async (id) => {
    let consulta = "delete from usuarios where id=$1 RETURNING *";
    let values = [id]
    let usuarios = await pool.query(consulta, values);
    return usuarios.rows[0];
  }


  module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUserById
  }