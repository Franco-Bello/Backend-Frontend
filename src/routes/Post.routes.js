//Importamos el objeto Routes de express
import { Router } from 'express';

//Creamos una instacia de Routes para masa facilidad
const router = Router();

//Importamos middlewares de validaciones
import { postValidationRules, validate } from '../middlewares/validator.js';

//Import Controllers
import { getPost, getOnePost, uploadPost, updatePost, deletePost } from "../controllers/Post.controllers.js"

//get
router.get('/Post', getPost)
router.get('/Post/:id', getOnePost)

//post
router.post('/Post',postValidationRules(), validate ,uploadPost)

//put
router.put('/Post/:id',postValidationRules(), validate , updatePost)

//delete
router.delete('/Post/:id', deletePost)


export default router