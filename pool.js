const {Pool} = require('pg'); 

const pool = new Pool({
    host: 'localhost',
    user: 'node',
    database: "m7_usuarios",
    password: '123456',
    port:5432,
    max: 5,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 1000,
  })

  //CONSULTAS A TABLA USUARIOS
  const getUsers = async () => {
    let consulta = {
        //rowMode: "json",
        text: "SELECT nombre, apellido, rut, email FROM usuarios"
    }
    let usuarios = await pool.query(consulta);
    usuarios.rows.forEach((usuario, index) => {
        console.log("usuario "+index+": ", usuario)
    });
    return usuarios.rows;
  }

  const getUserById = async (id) => {
    let consulta = "SELECT nombre, apellido, rut, email FROM usuarios where id = $1";
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

  //CONSULTA A TABLA PRODUCTOS
  const getProducts = async () => {
    let productos = await pool.query("SELECT * FROM productos");
    return productos.rows;
  }

  const addProduct = async (producto) => {
    let values = Object.values(producto);
    let consulta = "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES($1, $2, $3, $4) RETURNING *";
    let result = await pool.query(consulta, values);
    return result.rows;
  }


  module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUserById,
    getProducts,
    addProduct 
  }
