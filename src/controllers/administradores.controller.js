import { pool } from '../db.js'

export const getAdministradores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Administrador')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const getAdministrador = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Administrador WHERE id = ?', [id])

        if (rows.length <= 0) {
            throw new Error('Administrador no encontrado');
        }

        return rows[0];
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createAdministrador = async (req, res) => {
    try {
        const { nombre_usuario, contraseña, permisos, rol } = req.body
        const [rows] = await pool.query('INSERT INTO Administrador (nombre_usuario, contraseña, permisos, rol) VALUES (?, ?, ?, ?)', [nombre_usuario, contraseña, permisos, rol])
        res.send({
            id: rows.insertId,
            nombre_usuario,
            contraseña,
            permisos,
            rol
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const deleteAdministrador = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Administrador WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Administrador no encontrado.'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const updateAdministrador = async (req, res) => {
    const { id } = req.params
    const { nombre_usuario, contraseña, permisos, rol } = req.body
    try {
        const [result] = await pool.query('UPDATE Administrador SET nombre_usuario = IFNULL(?, nombre_usuario), contraseña = IFNULL(?, contraseña), permisos = IFNULL(?, permisos), rol = IFNULL(?, rol) WHERE id= ?', [nombre_usuario, contraseña, permisos, rol, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Administrador no encontrado.'
        })
        const [rows] = await pool.query('SELECT * FROM Administrador WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong.'
        })
    }
}

export const getAdministradorPorEmail = async (email) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Administrador WHERE email = ?', [email]);

        return rows;
    } catch (error) {
        throw error;
    }
}