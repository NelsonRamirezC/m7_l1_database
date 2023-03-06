const express = require('express');
const {getUsers, getUserById} = require('./pool.js')

const app = express();

//MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.listen(3000, ()=> console.log("servidor escuchando en http://localhost:3000/"))

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