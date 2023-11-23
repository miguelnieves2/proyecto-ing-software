import { Router } from 'express'
import passport from '../lib/passport.js';
import { isLoggedIn, isNotLoggedIn } from '../lib/auth.js'

const router = Router()

router.get('/registro', isNotLoggedIn, (req, res) => {
    res.render('auth/registro') // Renderizar el archivo registro.hbs
});


router.post('/registro', isNotLoggedIn, passport.authenticate('local.registro', {
    failureRedirect: '/registro',
    failureFlash: true
}), (req, res) => {
    // Redirigir basado en el rol del usuario
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
});

// Iniciar sesión

router.get('/iniciar-sesion', isNotLoggedIn, (req, res) => {
    res.render('auth/iniciar-sesion')
})

// Iniciar sesión y redirige a la ruta de su rol.

function getHomeRedirectUrl(user) {
    console.log('En authentication, funcion:getHomeRedirectUrl', user.rol);
    switch (user.rol) {
        case 'administrador':
            return '/admin/home-admin';
        case 'medico':
            return '/medico/home-medico';
        case 'recepcionista':
            return '/recepcionista/home-recepcionista';
        case 'paciente':
            return '/paciente/home-paciente';
        default:
            return '/';
    }
}

router.post('/iniciar-sesion', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.iniciar-sesion', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash('mensaje', info ? info.message : 'Error de autenticación');
            return res.redirect('/iniciar-sesion');
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            console.log('Authentication.js: usuario a iniciar sesion', user);

            const redirectUrl = getHomeRedirectUrl(user);
            console.log(`Authentication.js: el usuario a redirigir es: ${user.nombre} y se redirije a: `, redirectUrl);
            res.redirect(redirectUrl);
        });
    })(req, res, next);
});



// Ruta para cerrar sesión:
router.get('/cerrar-sesion', isLoggedIn, (req, res) => {
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/iniciar-sesion');
    });
});



export default router