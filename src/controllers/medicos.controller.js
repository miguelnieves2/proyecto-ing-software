import { pool } from '../db.js'

export const getMedicos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Medico')
        // res.json(rows)
        return rows; // Devuelve los datos para ser utilizados por otra función (admins.routers.js)
    } catch (error) {
        // return res.status(500).json({
        //     message: 'Something goes wrong.'
        // })
        throw error; // Lanza un error que se manejará en el router
    }
}

export const getMedico = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Medico WHERE id = ?', [req.params.id])
        // if (rows.length <= 0) return res.status(404).json({
        //     message: 'Medico no encontrado'
        // })
        // res.json(rows[0])
        return rows;
    } catch (error) {
        // return res.status(500).json({
        //     message: 'Something goes wrong'
        // })
        throw error;
    }
}

export const createMedico = async (req, res) => {
    try {
        const { nombreMedico, documentoIdentidad, fechaNacimiento, especialidad, correo, contraseña, celular, rol } = req.body
        const [rows] = await pool.query('INSERT INTO Medico (nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombreMedico, documentoIdentidad, fechaNacimiento, especialidad, correo, contraseña, celular, rol])
        // res.send({
        //     id: rows.insertId,
        //     nombreMedico,
        //     documentoIdentidad,
        //     fechaNacimiento,
        //     especialidad,
        //     correo,
        //     contraseña,
        //     celular,
        //     rol
        // })

        return rows.insertId; // Devuelve el ID del médico creado.
    } catch (error) {
        // return res.status(500).json({
        //     message: 'Something goes wrong.'
        // })
        throw error;
    }
}

export const deleteMedico = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Medico WHERE id = ?', [req.params.id])
        // if (result.affectedRows <= 0) return res.status(404).json({
        //     message: 'Medico no encontrado.'
        // })
        // res.sendStatus(204)
        return result;
    } catch (error) {
        // return res.status(500).json({
        //     message: 'Something goes wrong.'
        // })
        throw error;
    }
}

export const updateMedico = async (req) => {
    const { id } = req.params
    const { nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, rol } = req.body
    try {
        const [result] = await pool.query('UPDATE Medico SET nombre = ?, documento_identidad = ?, fecha_nacimiento = ?, especialidad = ?, email = ?, contraseña = ?, numero_celular = ?, rol = ? WHERE id = ?', [nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, rol, id]);
        console.log(`id recibido en controller: ${id}`);
        console.log(`nombre recibido en controller: ${nombre}`);
        return result;
    } catch (error) {

        throw error;
    }

    // export const updateMedico = async (req, res) => {
    //     const { id } = req.params
    //     const { nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, rol } = req.body
    //     try {
    //         const [result] = await pool.query('UPDATE Medico SET nombre = IFNULL(?, nombre), documento_identidad = IFNULL(?, documento_identidad), fecha_nacimiento = IFNULL(?, fecha_nacimiento), especialidad = IFNULL(?, especialidad), email = IFNULL(?, email), contraseña = IFNULL(?, contraseña), numero_celular = IFNULL(?, numero_celular), rol = IFNULL(?, rol) WHERE id= ?', [nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, rol, id])
    //         if (result.affectedRows === 0) return res.status(404).json({
    //             message: 'Medico no encontrado.'
    //         })
    //         const [rows] = await pool.query('SELECT * FROM Medico WHERE id = ?', [id])
    // res.json(rows[0])
    //     } catch (error) {
    // return res.status(500).json({
    //     message: 'Something goes wrong.'
    // })
    //     }
}
