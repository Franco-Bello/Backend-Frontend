//Importación de dependecias
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Importacion de las rutas
import UserRoutes from './routes/User.routes.js'
import PostRoutes from './routes/Post.routes.js'

//Asignar express a la const app
const app = express();

// Configurar cors
app.use(cors());

// Configurar morgan para registrar las solicitudes HTTP
app.use(morgan('dev'));

//Middlewares para usar json
app.use(express.json());



////Uso de las Routes
app.use(UserRoutes);
app.use(PostRoutes);


export default app;