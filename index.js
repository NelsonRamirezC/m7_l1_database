const express = require('express');
const {getUsers, getUserById, addUser, updateUser, deleteUserById, getProducts, addProduct } = require('./pool.js')
const cors = require('cors')

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.listen(3000, ()=> console.log("servidor escuchando en http://localhost:3000/"));


//MÉTODOS DE LECTURA
app.get("/usuarios", async (req, res) => {
    try {
        let resultado = await getUsers();
        console.log(resultado)
        res.json({code: 200, data: resultado})
    } catch (error) {
        res.status(500).json({code:500, message: "Ha ocurrido un error al buscar los usuarios."})
    }
   
})

app.get("/usuarios/:id", async (req, res) => {
    try{
        let {id} = req.params;
        let resultado = await getUserById(id);
        if(resultado.length == 0) return res.send("no se encontraron usuarios con ese id.")
        console.log(resultado)
        res.send(resultado)

    }catch(error){
        console.log(error)
        res.send("Se ha generado un error en la consulta.")
    }
 })

 //CREAR UN NUEVO USUARIO

 app.post("/usuarios", async (req, res) => {
    try {
        let nuevoUsuario = req.body
        let regex = /^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/i

        if(!regex.test(nuevoUsuario.nombre))return res.json({code: 400, message: "Nombre no cumple con el formato"})

        if(!regex.test(nuevoUsuario.apellido))return res.json({code: 400, message: "Apellido no cumple con el formato"})

         resultado = await addUser(nuevoUsuario);
         res.send(`usuario ${nuevoUsuario.nombre} agregado correctamente`);
    } catch (error) {
        console.log(error)
        res.send("ha ocurrido un error al insertar al usuario.")
    }
   
 })

 //ACTUALIZAR USUARIO
 app.put("/usuarios/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let { nombre, apellido, rut, email, password} = req.body;
        let usuario = {
        id, nombre, apellido, rut, email, password
        }
         resultado = await updateUser(usuario);
         res.send(`usuario ${nombre} actualizado correctamente`);
    } catch (error) {
        console.log(error)
        res.send("ha ocurrido un error al actualizar el usuario.")
    }
   
 })

 app.delete("/usuarios/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let usuario = await deleteUserById(id)
        if(!usuario){
            return res.send("No se encontró ningún usuario con el id: " + id)
        }
        res.send(`el usuario con nombre: ${usuario.nombre} y ID: ${usuario.id} ha sido eliminado.`)
        
    } catch (error) {
        console.log(error)
        res.send("ha ocurrido un error al eliminar el usuario.")
    }
 })


 app.get("/productos", async (req, res) => {

    try {
        let productos = await getProducts()
        res.json({code: 200, data: productos})
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al buscar los productos."})
    }
 })

 app.post("/productos", async (req, res) => {

    try {
        let {nombre, descripcion, precio, stock } = req.body;
        let nuevoProducto = {
            nombre, descripcion, precio, stock
        }

        let regex = /^[0-9]+$/g

        if(!regex.test(stock)) return res.json({code: 400, message: "stock no cumple con el formato"})

        let producto = await addProduct(nuevoProducto)
        res.json({code: 200, data: producto})
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, message: "Error al agregar un producto."})
    }
 })