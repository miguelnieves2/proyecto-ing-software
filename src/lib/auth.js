// --- PROTEGER RUTAS ----

// Si el usuario no ha iniciado sesión, no puede ir a otras rutas privadas
// Se define la ruta que se quiere proteger del usuario que no ha iniciado sesión
// colocando isLoggedIn en donde se creo la ruta, es decir app.js
export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/iniciar-sesion')
}

// Si el usuario inicio sesión, no puede ir a las rutas /registro o /iniciar-sesion
// de lo contrario, lo redirigira al home de su rol:
export const isNotLoggedIn = (req, res, next) => {

    // Si el usuario intenta entrar a /registro o /iniciar-sesion
    if (req.isAuthenticated()) {
        // Redirige al home del rol del usuario
        switch (req.user.rol) {
            case 'administrador':
                res.redirect('/admin/home-admin');
                break;
            case 'medico':
                res.redirect('/medico/home-medico');
                break;
            case 'recepcionista':
                res.redirect('/recepcionista/home-recepcionista');
                break;
            case 'paciente':
            default:
                res.redirect('/paciente/home-paciente');
                break;
        }
    } else {
        // Si no está autenticado, sigue con la solicitud original
        next();
    }
}


// No permite que un usuario con x rol, ingrese a una ruta de otro rol.
// Es decir, un paciente no puede ingresar a /home-admin.
// Si el usuario no ha iniciado sesión lo redirige a /iniciar sesión.
export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        console.log(`auth.js: checkRole req: ${req} y req.user.rol: ${req.user.rol}`);
        if (req.isAuthenticated()) {
            if (req.user.rol === requiredRole) {
                return next();
            } else {
                // Redirige al home del rol del usuario
                switch (req.user.rol) {
                    case 'administrador':
                        res.redirect('/admin/home-admin');
                        break;
                    case 'medico':
                        res.redirect('/medico/home-medico');
                        break;
                    case 'recepcionista':
                        res.redirect('/recepcionista/home-recepcionista');
                        break;
                    case 'paciente':
                    default:
                        res.redirect('/paciente/home-paciente');
                        break;
                }
            }
        } else {
            // Si no ha iniciado sesión
            req.flash('mensaje', 'Por favor inicia sesión para acceder a esta página');
            res.redirect('/iniciar-sesion');
        }
    }
}


// Redirecciona desde la ruta raíz según el estado de autenticación y el rol del usuario
// Es decir, si el usuario inicio sesión no puede ir a http:link o http:ip, lo redirije a su home.
//
// Si no ha iniciado sesión, no puede acceder a la ruta http:link , lo redirijira a http:link/iniciar-sesion
// Ej: 'http://localhost:{puerto}/' es redirigido a http://localhost:{puerto}/iniciar-sesion

export const redirectToRoleBasedHome = (req, res, next) => {
    if (req.isAuthenticated()) {
        switch (req.user.rol) {
            case 'administrador':
                return res.redirect('/admin/home-admin');
            case 'medico':
                return res.redirect('/medico/home-medico');
            case 'recepcionista':
                return res.redirect('/recepcionista/home-recepcionista');
            case 'paciente':
                return res.redirect('/paciente/home-paciente');
            default:
                return next();
        }
    } else {
        return res.redirect('/iniciar-sesion');
    }
};
