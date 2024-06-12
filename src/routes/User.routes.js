//Importamos el objeto Routes de express
import { Router } from 'express';

//Creamos una instacia de Routes para masa facilidad
const router = Router();

//Importamos middlewares para hacer rutas seguras
import authMiddleware from '../middlewares/authMiddleware.js';

//Importamos middlewares de validaciones
import { userValidationRules, validate } from '../middlewares/validator.js';

//Import Controllers
import { getUsers, getoneUser, registerUser, updateUser, deleteUser, getPostUser } from '../controllers/User.controllers.js'

//get
router.get('/User', authMiddleware, getUsers);
router.get('/User/:id', authMiddleware, getoneUser);
router.get('/User/:id/Post', authMiddleware, getPostUser)

//post
router.post('/User',userValidationRules(), validate ,registerUser);

//put
router.put('/User/:id', authMiddleware,userValidationRules(), validate ,updateUser);

//delete
router.delete('/User/:id', authMiddleware, deleteUser);





export default router;