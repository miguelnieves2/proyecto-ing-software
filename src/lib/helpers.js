import bcrypt from 'bcryptjs';
const helpers = {};

helpers.encryptContraseña = async (contraseña) => {
    const salt = await bcrypt.genSalt(11); // Cuantas veces se ejecute el hash - entre más mas segura y demora más
    const contraseñaFinal = await bcrypt.hash(contraseña, salt)
    return contraseñaFinal;
};

helpers.compararContraseña = async (contraseña, contraseñaDB) => {
    try {
        return await bcrypt.compare(contraseña, contraseñaDB); // Compara la contraseña que inserta el usuario con la de BD
    } catch (error) {
        console.log(error)
    }
}

export default helpers;