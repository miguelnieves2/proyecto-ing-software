import { Router } from 'express'
import { getAdministradores, getAdministrador, createAdministrador, updateAdministrador, deleteAdministrador } from '../controllers/administradores.controller.js'

import { createMedico, getMedicos, deleteMedico, getMedico, updateMedico } from '../controllers/medicos.controller.js'


const router = Router()

// Crear la vista /home-admin
router.get('/home-admin', (req, res) => {
    res.render('admins/home-admin')
})


// Renderizar o mostrar el formulario (add-medico.hbs)
router.get('/add-medico', (req, res) => {
    res.render('admins/add-medico') // con Render se le indica el nombre del archivo que quiere mostrar
})

// Realiza la petición para crear el medico.
router.post('/add-medico', async (req, res) => {
    try {
        const { 'nombre-medico': nombreMedico, 'documento-identidad': documentoIdentidad, 'fecha-nacimiento': fechaNacimiento, especialidad, email, contraseña, celular, rol } = req.body;
        const newMedico = {
            nombreMedico,
            documentoIdentidad,
            fechaNacimiento,
            especialidad,
            email,
            contraseña,
            celular,
            rol: 'medico'
        };
        // Valores obtenidos del formulario
        console.log('Admin.routes.js:', newMedico);

        createMedico({ ...req, body: newMedico }, res);
        // Mensaje exitoso
        req.flash('exitoso', 'Médico almacenado en la base de datos correctamente.');
        // Renderizar
        res.redirect('/admin/home');
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
        req.flash('exitoso', 'Médico eliminado de la base de datos correctamente.')
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
        console.log(`Admin.routes:id del medico a editar`, id);

        // Obtenemos la información del medico seleccionado
        const medico = await getMedico(id);

        const medicoObj = medico;
        console.log('admin.routes: medicoObjeto', medicoObj);

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
        console.log(`Desde AdminRoutes: `, req.body);
        const { id } = req.params;
        const { 'nombre-medico': nombre, 'documento-identidad': documento_identidad, 'fecha-nacimiento': fecha_nacimiento, especialidad, email, contraseña, numero_celular, rol } = req.body;
        const newMedico = { nombre, documento_identidad, fecha_nacimiento, especialidad, email, contraseña, numero_celular, rol };

        console.log("ID recibido: ", req.params.id);
        await updateMedico({ params: { id }, body: newMedico });

        req.flash('exitoso', 'Médico actualizado exitosamente.')
        res.redirect('/admin/medicos');
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
