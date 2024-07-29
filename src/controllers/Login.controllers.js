import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por su email en la base de datos
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar el token JWT utilizando la clave secreta de las variables de entorno
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar el token JWT y el userId en la respuesta
        res.json({ token, userId: user.id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};