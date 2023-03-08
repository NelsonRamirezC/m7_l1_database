const {Pool} = require('pg'); 
const Cursor = require('pg-cursor')

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

  const getProducts = async () => {
    const client = await pool.connect()

    let consulta = "SELECT * FROM productos";

    const cursor = client.query(new Cursor(consulta))
    
    let bandera = true;
    while(bandera){
        cursor.read(5, (error, rows) => {
            if(error) return console.log("ha ocurrido un error")
            rows.forEach(registro => {
                console.log(registro)
                if(registro.nombre == "Ginnie"){
                    bandera = false;
                    console.log(registro.nombre)
                    console.log("registro encontrado")
                }
            })
        })
    }


}


  getProducts();
