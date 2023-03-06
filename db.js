const {Client} = require('pg'); 

const client = new Client({
    host: 'localhost',
    user: 'node',
    password: '123456',
    port: 5432,
    database: 'm7_usuarios'
})

/* client.connect(error => {
    if(error){
        console.log(error.message)
        console.error("Ha ocurrido un problema al conectarse a la base de datos.")
    }else{
        console.log("Se ha conectado a la base de datos m7_usuarios.")
    }
}) */
client.connect()

client.query("SELECT * FROM usuarios WHERE id = 1", (error, result) => {
    if(error) console.error(error)
    console.table(result.rows);
    client.end();
})