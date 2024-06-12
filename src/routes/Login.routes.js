import { Router } from 'express';
import { loginUser } from '../controllers/Login.controllers.js';
import { loginValidationRules, validate } from '../middlewares/validator.js';

const router = Router();

router.post('/login', loginValidationRules(), validate, loginUser);

export default router;