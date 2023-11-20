import { pool } from '../db.js'

export const getRecepcionistas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Recepcionista')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const getRecepcionista = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Recepcionista WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Recepcionista no encontrado'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createRecepcionista = async (req, res) => {
    try {
        const { nombre, documento_identidad, email, contraseña, numero_celular, rol } = req.body
        const [rows] = await pool.query('INSERT INTO Recepcionista (nombre, documento_identidad, email, contraseña, numero_celular, rol) VALUES (?, ?, ?, ?, ?, ?)', [nombre, documento_identidad, email, contraseña, numero_celular, rol])
        res.send({
            id: rows.insertId,
            nombre,
            documento_identidad,
            email,
            contraseña,
            numero_celular,
            rol
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteRecepcionista = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Recepcionista WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Recepcionista no encontrado.'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updateRecepcionista = async (req, res) => {
    const { id } = req.params
    const { nombre, documento_identidad, email, contraseña, numero_celular, rol } = req.body
    try {
        const [result] = await pool.query('UPDATE Recepcionista SET nombre = IFNULL(?, nombre), documento_identidad = IFNULL(?, documento_identidad), email = IFNULL(?, email), contraseña = IFNULL(?, contraseña), numero_celular = IFNULL(?, numero_celular), rol = IFNULL(?, rol) WHERE id= ?', [nombre, documento_identidad, email, contraseña, numero_celular, rol, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Recepcionista no encontrado.'
        })
        const [rows] = await pool.query('SELECT * FROM Recepcionista WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}
