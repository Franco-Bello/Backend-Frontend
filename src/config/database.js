//Configracion de la base de datos con Mysql y Sequelize
import { Sequelize } from 'sequelize';

//Importamos Dotenv
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config(); 

//Creamos instancia de Sequelize con las variables de entorno
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);