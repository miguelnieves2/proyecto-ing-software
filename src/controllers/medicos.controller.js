import { pool } from '../db.js'
import helpers from '../lib/helpers.js';

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

export const getMedico = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Medico WHERE id = ?', [id])

        if (rows.length <= 0) {
            throw new Error('Medico no encontrado');
        }

        return rows[0];
    } catch (error) {

        throw error;
    }
}

export const createMedico = async (req, res) => {
    try {
        const { nombreMedico, documentoIdentidad, fechaNacimiento, especialidad, email, contraseña, celular, rol } = req.body
        const contraseñaHash = await helpers.encryptContraseña(contraseña);
        const [rows] = await pool.query('INSERT INTO Medico (nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombreMedico, documentoIdentidad, fechaNacimiento, especialidad, email, contraseñaHash, celular, rol])
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
    const { id } = req.params;
    let { nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular } = req.body;

    // Comprobación adicional para la contraseña
    if (contraseña && contraseña.trim() !== '') {
        // Si se proporcionó una nueva contraseña, hashearla
        contraseña = await helpers.encryptContraseña(contraseña);
    } else {
        // Si no se proporcionó una contraseña, usar la existente
        const medicoActual = await getMedico(id);
        contraseña = medicoActual.contraseña;
    }

    const datosActualizados = {
        nombre,
        documento_identidad,
        fecha_nacimiento,
        especialidad,
        email,
        contraseña, // Usar contraseña directamente aquí
        numero_celular,
        rol: 'medico'
    };

    try {
        const [result] = await pool.query('UPDATE Medico SET nombre = ?, documento_identidad = ?, fecha_nacimiento = ?, especialidad = ?, email = ?, contraseña = ?, numero_celular = ?, rol = ? WHERE id = ?', [
            datosActualizados.nombre,
            datosActualizados.documento_identidad,
            datosActualizados.fecha_nacimiento,
            datosActualizados.especialidad,
            datosActualizados.email,
            datosActualizados.contraseña,
            datosActualizados.numero_celular,
            datosActualizados.rol,
            id
        ]);

        return result;
    } catch (error) {
        throw error;
    }
}



export const getMedicoPorEmail = async (email) => {
    try {
        // console.log('Medicos.controller: email: ', email);
        const [rows] = await pool.query('SELECT * FROM Medico WHERE email = ?', [email]);
        // console.log('Medicos.controller: medicoEmail: ', rows);

        return rows;
    } catch (error) {
        throw error;
    }
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

