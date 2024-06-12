import { body, validationResult } from 'express-validator';

//Validaciones para User
export const userValidationRules = () => {
    return [
        body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
        body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email debe ser válido'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    ];
};

//Validaciones pra Post
export const postValidationRules = () => {
    return [
        body('content').notEmpty().withMessage('El contenido es obligatorio')
    ];
};

//Validaciones pra Login
export const loginValidationRules = () => {
    return [
        body('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio')
            .isEmail().withMessage('El correo electrónico no es válido'),
        body('password')
            .notEmpty().withMessage('La contraseña es obligatoria'),
    ];
};


export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors
    });
};

