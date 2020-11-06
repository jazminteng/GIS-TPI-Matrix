const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3001

app.use(express.json());

function consultar(consulta) {
    return new Promise((resolver, rechazar) => {
        db.connect()
            .then(client => {
                return client
                    .query(consulta)
                    .then(result => {
                        client.release()
                        if (result.rows.length == 0) {
                            resolver({ msg: 'No hay resultados.' });
                        }
                        else {
                            resolver({ consulta: result.rows });
                        }
                        console.log(result.rows[1])
                    })
                    .catch(err => {
                        client.release()
                        rechazar({ error: 'uraura' });
                        console.log(err.stack)
                    })
            })
    });
}

var consultsdad = function (coordinate) {


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

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.post('/punto', (req, res) => {
    console.log(req.body);

    var wkt = 'POINT(' + req.body.coordinates[0] + ' ' + req.body.coordinates[1] + ')';

    //if(req.body.tabla pertenece a tal tipo, cambiar la consulta)

    const consulta = `SELECT * FROM ${req.body.tabla} WHERE
    st_intersects(
        ST_geomfromtext('${wkt}', 4326),
        geom
    )`;

    consultar(consulta)
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((error)=>{
            res.status(200).send(error);
        })

})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})