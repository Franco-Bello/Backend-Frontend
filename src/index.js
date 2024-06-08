//Importación de dependecias
import app  from './app.js'
import { sequelize } from './config/database.js'
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config(); 

// Obtener el puerto de las variables de entorno o usar el valor predeterminado (4000)
const port = process.env.PORT || 4000; 

//Solo se llama a esto si se necesita volver a crear los modelos
//import './models/User.js';
//import './models/Post.js';

async function main() {
    try {
        //Sincronizar la base de datos
        await sequelize.sync({force: false})
        console.log('Conexión a la base de datos establecida y sincronizada.');

        //Iniciar el servidor
        const server = app.listen(port, () => {
            console.log(`Servidor en funcionamiento en el puerto ${port}.`)
        });

        //Manejar señales de terminación del servidor
        process.on('SIGINT', () => {
            console.log('Aplicación terminada.');
            // Cerrar el servidor antes de finalizar la aplicación
            server.close(() => {
                console.log('Servidor cerrado correctamente.');
                process.exit(0); // Finalizar la aplicación después de cerrar el servidor
            });
        });

          
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
        process.exit(1); // Finalizar la aplicación en caso de error 
    }
}

main();