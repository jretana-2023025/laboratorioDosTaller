//validar campos en las rutas
import { body } from "express-validator";
import { validateErrors } from "./validate.error.js";
import { existUsername, existEmail } from "../utils/db.validators.js";


//arreglo de validacion (por cada ruta)
export const registerValidator=[
    body('name','Name cannot be empty').notEmpty(),
    body('surname','Surname cannot be empty').notEmpty(),
    body('email','Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('username','username cannot be empty').notEmpty().toLowerCase(),
    
    body('password','password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min:8}),
    body('phone','Phone cannot be empty').notEmpty().isMobilePhone(),
    body('username').notEmpty().toLowerCase().custom(existUsername),
    validateErrors

]