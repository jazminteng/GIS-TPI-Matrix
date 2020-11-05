const express = require('express')
const { Client } = require('pg')
const app = express()
const port = 3001


const client = new Client({
    user: 'matrix',
    host: 'localhost',
    database: 'matrix',
    password: 'matrix',
    port: 5432,
  })
client.connect();

const result = client.query('SELECT provincia from provincias', (err, res) => {
    console.log(err, res)
    client.end()
  })

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})