import { Router } from "express";

const router = Router();

//Import Controllers
import { getPost, getOnePost, uploadPost, updatePost, deletePost } from "../controllers/Post.controllers.js"

//get
router.get('/Post', getPost)
router.get('/Post/:id', getOnePost)

//post
router.post('/Post', uploadPost)

//put
router.put('/Post/:id', updatePost)

//delete
router.delete('/Post/:id', deletePost)


export default router