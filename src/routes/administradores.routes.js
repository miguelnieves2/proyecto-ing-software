import { Router } from 'express'
import { getAdministradores, getAdministrador, createAdministrador, updateAdministrador, deleteAdministrador } from '../controllers/administradores.controller.js'

import { createMedico, getMedicos, deleteMedico, getMedico, updateMedico } from '../controllers/medicos.controller.js'


const router = Router()


// Renderizar o mostrar el formulario (add-medico.hbs)
router.get('/add-medico', (req, res) => {
    res.render('admins/add-medico') // con Render se le indica el nombre del archivo que quiere mostrar
})

// Realiza la petición para crear el medico.
router.post('/add-medico', async (req, res) => {
    try {
        const { 'nombre-medico': nombreMedico, 'documento-identidad': documentoIdentidad, 'fecha-nacimiento': fechaNacimiento, especialidad, correo, contraseña, celular, rol } = req.body;
        const newMedico = {
            nombreMedico,
            documentoIdentidad,
            fechaNacimiento,
            especialidad,
            correo,
            contraseña,
            celular,
            rol //TODO: Colocar Médico por defecto desde aqui como valor y quitarlo en el formulario.
        };
        // Valores obtenidos del formulario
        console.log(newMedico);

        createMedico({ ...req, body: newMedico }, res);
        res.redirect('/admin/medicos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al añadir el médico.')
    }
})

// Renderizar o mostrar los doctores en /admin/medicos (add-medico.hbs)
router.get('/medicos', async (req, res) => {
    try {
        const medicos = await getMedicos(req, res); // Obtiene los médicos
        res.render('admins/lista-medicos', { medicos }); // Renderiza la vista con los médicos
    } catch (error) {
        console.log(error);
        res.send('Error al obtener los medicos.')
    }
})

// ----------------- ELIMINAR MÉDICO
router.get('/delete/medico/:id', async (req, res) => {
    try {
        const { id } = req.params.id;
        deleteMedico({ ...req, body: id }, res);
        res.redirect('/admin/medicos');
    } catch (error) {
        console.log(error);
        res.send('Error al eliminar el medico.')
    }
});

// ----------------- EDITAR MÉDICO
//  Mostrar el formulario de editar
router.get('/edit/medico/:id', async (req, res) => {
    try {
        // Obtenemos el ID del boton en lista-medicos.hbs
        const { id } = req.params;
        // Obtenemos la información del medico seleccionado
        const medico = await getMedico({ ...req, params: { id } }, res);

        const medicoObj = medico[0];

        // Formatear la fecha de nacimiento
        if (medicoObj && medicoObj.fecha_nacimiento) {
            medicoObj.fecha_nacimiento = medicoObj.fecha_nacimiento.toISOString().split('T')[0];
        }

        // console.log('Medico: ', medicoObj);

        // renderizamos el formulario de edit y enviamos los datos del medico.
        res.render('admins/edit-medico', { medico: medicoObj })
    } catch (error) {
        console.log(error);
        res.send('Error al editar el medico.')
    }
});
//  Realizar la petición para editar
router.post('/edit/medico/:id', async (req, res) => {
    try {
        console.log("ID recibido: ", req.params.id);
        await (updateMedico(req));
        res.redirect('/admin/medicos');

        // console.log("ID recibido: ", id);
        // const { 'nombre-medico': nombreMedico, 'documento-identidad': documentoIdentidad, 'fecha-nacimiento': fechaNacimiento, especialidad, correo, contraseña, celular, rol } = req.body;
        // const newMedico = {
        //     nombreMedico,
        //     documentoIdentidad,
        //     fechaNacimiento,
        //     especialidad,
        //     correo,
        //     contraseña,
        //     celular,
        //     rol //TODO: Colocar Médico por defecto desde aqui como valor y quitarlo en el formulario.
        // };


        // await updateMedico({ params: id, body: newMedico });
        // res.redirect('/admin/medicos');
    } catch (error) {
        console.error(error);
        res.send('Error al editar el medico en la base de datos.')
    }

})


router.get('/administradores', getAdministradores)

router.get('/administradores/:id', getAdministrador)

router.post('/administradores', createAdministrador)

router.patch('/administradores/:id', updateAdministrador)

router.delete('/administradores/:id', deleteAdministrador)


// AÑADIR DOCTORES
// router.post('/add')

export default router
