import { Router } from 'express'
import { getMedicos, getMedico, createMedico, updateMedico, deleteMedico } from '../controllers/medicos.controller.js'
import { getPacientes } from '../controllers/pacientes.controller.js'

import helpers from '../lib/helpers.js';

const router = Router()

// Crear la vista /home-medico
router.get('/home-medico', (req, res) => {
    res.render('medicos/home-medico')
})

// Renderizar o mostrar los doctores en /admin/medicos (add-medico.hbs)
router.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await getPacientes(req, res); // Obtiene los médicos
        res.render('medicos/lista-pacientes', { pacientes }); // Renderiza la vista con los médicos
    } catch (error) {
        console.log(error);
        res.send('Error al obtener los pacientes.')
    }
})


router.get('/editar-perfil', async (req, res) => {
    try {
        // Suponiendo que el ID del médico se almacena en la sesión del usuario
        const idMedico = req.user.id;
        const medico = await getMedico(idMedico);

        // Formatear la fecha de nacimiento para el input de tipo 'date'
        if (medico.fecha_nacimiento) {
            medico.fecha_nacimiento = medico.fecha_nacimiento.toISOString().split('T')[0];
        }


        res.render('medicos/editar-perfil-medico', { medico });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la información del médico.');
    }
});


router.post('/actualizar-perfil', async (req, res) => {
    try {
        const idMedico = req.user.id;
        let { nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular } = req.body;


        // if (contraseña) {
        //     contraseña = await helpers.encryptContraseña(contraseña);
        // }

        const datosActualizados = {
            nombre,
            documento_identidad,
            fecha_nacimiento,
            especialidad,
            email,
            contraseña,
            numero_celular,
            rol: 'medico'
        };

        await updateMedico({ params: { id: idMedico }, body: datosActualizados });

        req.flash('exitoso', 'Perfil actualizado correctamente.');
        res.redirect('/medico/home-medico');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el perfil del médico.');
    }
});



router.get('/', getMedicos)

router.get('/:id', getMedico)

router.post('/', createMedico)

router.patch('/:id', updateMedico)

router.delete('/:id', deleteMedico)

export default router
