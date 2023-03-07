const express = require('express');
const {getUsers, getUserById, addUser, updateUser} = require('./pool.js')
const cors = require('cors')

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.listen(3000, ()=> console.log("servidor escuchando en http://localhost:3000/"));


//MÉTODOS DE LECTURA
app.get("/usuarios", async (req, res) => {
   let resultado = await getUsers();
   console.log(resultado)
    res.send(resultado)
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
         resultado = await addUser(req.body);
         res.send(`usuario ${req.body.nombre} agregado correctamente`);
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
        res.send("ha ocurrido un error al actualizar el usuaruo al usuario.")
    }
   
 })