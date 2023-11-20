import { pool } from '../db.js'

export const getAgendas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Agenda')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const getAgenda = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Agenda WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Agenda no encontrada'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createAgenda = async (req, res) => {
    try {
        const { fechas_disponibles, medico_id } = req.body
        const [rows] = await pool.query('INSERT INTO Agenda (fechas_disponibles, medico_id) VALUES (?, ?)', [fechas_disponibles, medico_id])
        res.send({
            id: rows.insertId,
            fechas_disponibles,
            medico_id
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteAgenda = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Agenda WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Agenda no encontrada.'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updateAgenda = async (req, res) => {
    const { id } = req.params
    const { fechas_disponibles, medico_id } = req.body
    try {
        const [result] = await pool.query('UPDATE Agenda SET fechas_disponibles = IFNULL(?, fechas_disponibles), medico_id = IFNULL(?, medico_id) WHERE id= ?', [fechas_disponibles, medico_id, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Agenda no encontrada.'
        })
        const [rows] = await pool.query('SELECT * FROM Agenda WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}
