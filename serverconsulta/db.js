const { Pool } = require('pg')

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

module.exports = db;