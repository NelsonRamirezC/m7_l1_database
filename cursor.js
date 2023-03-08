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

pool.connect(async (error, client, release) => {
  if (error) {
    console.log(
      "Se ha generado un error en la conexión a la BD usuarios: " + error
    );
  } else {
    try {
      const consulta = "select * from productos";
      const consultaCursor = new Cursor(consulta);
      const cursor = client.query(consultaCursor);

      //let data1 = await cursor.read(1);
      let flag = true;
      let rows = [0];
      let numero = 1;
      while (flag && rows.length) {
        rows = await cursor.read(5);
        rows.forEach((registro) => {
            console.log(numero)
            numero ++;
          if (registro.nombre == "Hettie") {
            flag = false;
            console.log("registro encontrado: ", registro.nombre)
            cursor.close();
          }
        });
      }
      release();
      pool.end();
      //const resultados = await client.query(consulta);
    } catch (e) {
      console.log("Error al consultar la BD usuarios: " + e);
    }
  }
});