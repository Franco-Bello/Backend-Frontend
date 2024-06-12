//Importación de dependecias
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

//Importacion de las rutas
import UserRoutes from './routes/User.routes.js'
import PostRoutes from './routes/Post.routes.js'
import LoginRoutes from './routes/Login.routes.js';

//Asignar express a la const app
const app = express();


// Configura Helmet para mejorar la seguridad
app.use(helmet());

// Usa Compression para comprimir las respuestas
app.use(compression());

// Configurar cors
app.use(cors());

// Configurar morgan para registrar las solicitudes HTTP
app.use(morgan('dev'));

//Middlewares para usar json
app.use(express.json());


////Uso de las Routes
app.use(UserRoutes);
app.use(PostRoutes);
app.use(LoginRoutes)


export default app;