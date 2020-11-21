const express = require('express')
const { Pool } = require('pg')

const db = require('./db')

const app = express()
const port = 3001

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

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
                            const resultado = result.rows.map((fila) => {
                                delete fila.geom;
                                return fila;
                            })
                            resolver({ resultado: resultado });
                        }
                    })
                    .catch(err => {
                        client.release()
                        rechazar({ error: 'uraura' });
                        console.log(err.stack)
                    })
            })
    });
}

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.post('/punto', (req, res) => {
    const wkt = 'POINT(' + req.body.coordinates[0] + ' ' + req.body.coordinates[1] + ')'

    const tolerancia = 4 // pixeles

    const consulta = `SELECT * FROM ${req.body.tabla} WHERE
            st_dwithin(
                ST_geomfromtext('${wkt}', 4326),
                geom,
                ${tolerancia * req.body.pixel}
            )`

    consultar(consulta).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(200).send(error)
    })
})

app.post('/caja', (req, res) => {
    const coordinate = req.body.coordinates;
    var wkt = 'POLYGON(('
    for (var i = 0; i < coordinate[0].length - 1; i++) {
        wkt += coordinate[0][i][0] + ' ' + coordinate[0][i][1] + ','
    }
    wkt += coordinate[0][0][0] + ' ' + coordinate[0][0][1] + '))'

    const consulta = `SELECT * FROM ${req.body.tabla} WHERE
            st_intersects(
                ST_geomfromtext('${wkt}', 4326),
                geom
            )`
    consultar(consulta).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(200).send(error)
    })
})

// Creamos una tabla y le agregamos un campo de geometria
// SELECT AddGeometryColumn ('public','prueba','geom',4326,'POINT',2);
app.post('/nuevoPunto', (req, res) => {
    if (req.body.coordinates == undefined || req.body.name == undefined) {
        res.status(200).send({ msg: 'Informacion incompleta' });
        return 0;
    }
    const wkt = 'POINT(' + req.body.coordinates[0] + ' ' + req.body.coordinates[1] + ')'

    const consulta = `INSERT INTO prueba (name, geom) VALUES('${req.body.name}',ST_geomfromtext('${wkt}', 4326))`

    db.connect()
        .then(client =>
            client.query(consulta)
                .then(result => res.status(200).send(result.rows))
                .then(client.release())
                .catch(error => console.log(error))
        )
        .catch(err => {
            client.release()
            res.status(404).send(error)
        })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})