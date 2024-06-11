//Importamos el objeto Routes de express
import { Router } from 'express';

//Creamos una instacia de Routes para masa facilidad
const router = Router();

//Importamos middlewares de validaciones
import { userValidationRules, validate } from '../middlewares/validator.js';

//Import Controllers
import { getUsers, getoneUser, registerUser, updateUser, deleteUser, getPostUser } from '../controllers/User.controllers.js'

//get
router.get('/User', getUsers);
router.get('/User/:id', getoneUser);
router.get('/User/:id/Post', getPostUser)

//post
router.post('/User',userValidationRules(), validate ,registerUser);

//put
router.put('/User/:id',userValidationRules(), validate ,updateUser);

//delete
router.delete('/User/:id', deleteUser);





export default router;