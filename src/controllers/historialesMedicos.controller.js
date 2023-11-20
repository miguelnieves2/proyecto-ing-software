import { pool } from '../db.js'

export const getHistorialesMedicos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Historial_Medico')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const getHistorialMedico = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Historial_Medico WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Historial médico no encontrado'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createHistorialMedico = async (req, res) => {
    try {
        const { informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id } = req.body
        const [rows] = await pool.query('INSERT INTO Historial_Medico (informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id) VALUES (?, ?, ?, ?)', [informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id])
        res.send({
            id: rows.insertId,
            informacion_medica,
            medicamentos_recetados,
            pruebas_realizadas,
            paciente_id
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteHistorialMedico = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Historial_Medico WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Historial médico no encontrado.'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updateHistorialMedico = async (req, res) => {
    const { id } = req.params
    const { informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id } = req.body
    try {
        const [result] = await pool.query('UPDATE Historial_Medico SET informacion_medica = IFNULL(?, informacion_medica), medicamentos_recetados = IFNULL(?, medicamentos_recetados), pruebas_realizadas = IFNULL(?, pruebas_realizadas), paciente_id = IFNULL(?, paciente_id) WHERE id= ?', [informacion_medica, medicamentos_recetados, pruebas_realizadas, paciente_id, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Historial médico no encontrado.'
        })
        const [rows] = await pool.query('SELECT * FROM Historial_Medico WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}
