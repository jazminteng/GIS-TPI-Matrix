const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3001

var consultar = function (coordinate) {


    console.log(coordinate);
    if (coordinate.length == 2) {
        //es un punto [lon,lat]
        var wkt = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
    } else {
        //es un poligono en la forma [ [ [lon,lat],[lon,lat],....] ]
        var wkt = 'POLYGON((';
        for (var i = 0; i < coordinate[0].length - 1; i++) {
            wkt += coordinate[0][i][0] + ' ' + coordinate[0][i][1] + ',';
        }
        wkt += coordinate[0][0][0] + ' ' + coordinate[0][0][1] + '))'
    }
    console.log(wkt);
    window.open('consulta.php?wkt=' + wkt);

};


const db = new Pool({
    user: 'matrix',
    host: 'localhost',
    database: 'matrix',
    password: 'matrix',
    port: 5432,
})

db.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

db.connect()
  .then(client => {
    return client
      .query('SELECT provincia from provincias')
      .then(res => {
        client.release()
        console.log(res.rows[1])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.get('/punto', (req, res) => {

    var wkt = 'POINT(' + req.body.coordinate[0] + ' ' + req.body.coordinate[1] + ')';

    //if(req.body.tabla pertenece a tal tipo, cambiar la consulta)

    const consulta = `SELECT * FROM ${req.body.tabla} WHERE
    st_intersects(
        ST_geomfromtext('${wkt}', 4326),
        geom
    )`;

    res.status(200).send('Hello World!');
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})