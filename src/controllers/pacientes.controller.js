import { pool } from '../db.js'

export const getPacientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Paciente')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const getPaciente = async (req, res) => {
    try {
        console.log(req.params.id); // Guarda todos los parametros que viajan a traves de la URL
        const [rows] = await pool.query('SELECT * FROM Paciente WHERE id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'Paciente no encontrado'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createPaciente = async (req, res) => {
    try {
        const { nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, rol } = req.body
        const [rows] = await pool.query('INSERT INTO Paciente (nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios) VALUES (?, ?, ?, ?, ?)', [nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, rol])
        res.send({
            id: rows.insertId,
            nombre,
            documento_identidad,
            fecha_nacimiento,
            tipo_sangre,
            prestadora_servicios,
            rol
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deletePaciente = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Paciente WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Paciente no encontrado.'
        })

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updatePaciente = async (req, res) => {
    const { id } = req.params
    const { nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, rol } = req.body
    try {
        console.log(id, nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, rol);

        const [result] = await pool.query('UPDATE Paciente SET nombre = IFNULL(?, name), documento_identidad = IFNULL(?, documento_identidad), fecha_nacimiento = IFNULL(?, fecha_nacimiento), tipo_sangre = IFNULL(?, tipo_sangre), prestadora_servicios = IFNULL(?, prestadora_servicios), rol = IFNULL(?, rol) WHERE id= ?', [nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, rol])

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Paciente no encontrado.'
        })

        const [rows] = await pool.query('SELECT * FROM Paciente WHERE id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}