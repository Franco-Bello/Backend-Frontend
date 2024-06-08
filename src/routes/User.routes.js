import { Router } from 'express';

const router = Router();


//Import Controllers
import { getUsers, getoneUser, registerUser, updateUser, deleteUser, getPostUser } from '../controllers/User.controllers.js'

//get
router.get('/User', getUsers);
router.get('/User/:id', getoneUser);
router.get('/User/:id/Post', getPostUser)

//post
router.post('/User', registerUser);

//put
router.put('/User/:id', updateUser);

//delete
router.delete('/User/:id', deleteUser);





export default router;