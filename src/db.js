import { createPool } from 'mysql2/promise'
import {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
} from './config.js'

import util, { promisify } from 'util';

export const pool = createPool({
    host: DB_HOST, // o direccion ip
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})

//TODO: toco comentarlo porque no funciona, da error.

// pool.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('DATABASE CONNECTION WAS CLOSED');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('DATABASE HAS TO MANY CONNECTIONS');
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('DATABASE CONNECTIONS WAS REFUSED');
//         }
//     }

//     if (connection) connection.release();
//     console.log('DB is connected!');
//     return;
// })

// // Promisify Pool Querys:
// pool.query = promisify(pool.query)
