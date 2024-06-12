import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Middleware de autenticación JWT
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token de autorización no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.user = decoded.userId; // Añadir el userId decodificado al objeto req
        next(); // Continuar con la siguiente función de middleware o controlador
    } catch (error) {
        return res.status(401).json({ message: 'Acceso denegado. Token de autorización inválido.' });
    }
};

export default authMiddleware;
