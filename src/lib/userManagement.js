import { getAdministradorPorEmail, getAdministrador } from '../controllers/administradores.controller.js';

import { getPacientePorEmail, getPaciente } from '../controllers/pacientes.controller.js';

import { getMedicoPorEmail, getMedico } from '../controllers/medicos.controller.js';

import { getRecepcionistaPorEmail, getRecepcionista } from '../controllers/recepcionistas.controller.js';
export async function buscarUsuarioPorEmail(email) {
    // Intenta buscar en Administradores
    let resultados = await getAdministradorPorEmail(email);
    if (resultados.length > 0) {
        console.log(`Usuario encontrado como administrador: `, resultados[0]);
        return resultados[0];
    }

    // Intenta buscar en Pacientes
    resultados = await getPacientePorEmail(email);
    if (resultados.length > 0) {
        console.log(`Usuario encontrado como paciente: `, resultados[0]);
        return resultados[0];
    }

    // Intenta buscar en Médicos
    resultados = await getMedicoPorEmail(email);
    if (resultados.length > 0) {
        console.log(`Usuario encontrado como medico: `, resultados[0]);
        return resultados[0];
    }

    resultados = await getRecepcionistaPorEmail(email);
    if (resultados.length > 0) {
        console.log(`Usuario encontrado como recepcionista: `, resultados[0]);
        return resultados[0];
    }

    return null; // Si no se encuentra en ninguna tabla
}


export async function buscarUsuarioPorIdYRol(id, rol) {
    switch (rol) {
        case 'administrador':
            return await getAdministrador(id);
        case 'paciente':
            return await getPaciente(id);
        case 'medico':
            return await getMedico(id)
        case 'recepcionista':
            return await getRecepcionista(id)
        // y así sucesivamente para otros roles...
        default:
            return null;
    }
}
