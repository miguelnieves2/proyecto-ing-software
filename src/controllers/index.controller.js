import { pool } from '../db.js'

export const ping = async (req, res) => {
    try {
        // Realiza la consulta y espera la promesa
        const [result] = await pool.query('SELECT "Pong" AS result');
        console.log(result);
        console.log(`resultado entre llaves`, { result });
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error executing query' });
    }
}
