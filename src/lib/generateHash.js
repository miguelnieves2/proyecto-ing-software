// Requiere bcrypt
import bcrypt from 'bcryptjs';

// Función para generar hash
async function generateHash(contraseña) {
    const salt = await bcrypt.genSalt(11);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);
    return contraseñaHash;
}

// Ejecutar la función con la contraseña deseada
generateHash('admin123').then(hash => {
    console.log("Hash generado:", hash);
    // Ahora puedes usar este hash en tu base de datos
});
