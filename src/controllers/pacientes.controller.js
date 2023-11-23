import { pool } from '../db.js'

export const getPacientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Paciente')

        return rows;
    } catch (error) {
        throw error; // Lanza un error que se manejará en el router
    }
}

export const getPaciente = async (id) => {
    try {
        // console.log(req.params.id); // Guarda todos los parametros que viajan a traves de la URL
        const [rows] = await pool.query('SELECT * FROM Paciente WHERE id = ?', [id])

        if (rows.length <= 0) {
            throw new Error('Paciente no encontrado');
        }

        return rows[0];
    } catch (error) {
        throw error;
    }
}
// antes recibia (req, res), se cambio para passport, se cambio porque archivo passport no maneja res.
export const createPaciente = async (datosPaciente) => {
    try {
        const { nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular } = datosPaciente;
        const [rows] = await pool.query('INSERT INTO Paciente (nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular]);

        return rows.insertId; // Devuelve el ID del paciente creado.
    } catch (error) {
        throw error;
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
    const { id } = req.params;
    const { nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular, rol } = req.body;

    try {
        const [result] = await pool.query('UPDATE Paciente SET nombre = IFNULL(?, nombre), documento_identidad = IFNULL(?, documento_identidad), fecha_nacimiento = IFNULL(?, fecha_nacimiento), tipo_sangre = IFNULL(?, tipo_sangre), prestadora_servicios = IFNULL(?, prestadora_servicios), email = IFNULL(?, email), contraseña = IFNULL(?, contraseña), numero_celular = IFNULL(?, numero_celular), rol = IFNULL(?, rol) WHERE id = ?', [nombre, documento_identidad, fecha_nacimiento, tipo_sangre, prestadora_servicios, email, contraseña, numero_celular, rol, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado.' });
        }

        const [rows] = await pool.query('SELECT * FROM Paciente WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong.' });
    }
}


export const getPacientePorEmail = async (email) => {
    try {
        // console.log('Pacientes.controller: email: ', email);
        const [rows] = await pool.query('SELECT * FROM Paciente WHERE email = ?', [email]);
        // console.log('Pacientes.controller: pacienteEmail: ', rows);
        return rows;
    } catch (error) {
        throw error;
    }
}



