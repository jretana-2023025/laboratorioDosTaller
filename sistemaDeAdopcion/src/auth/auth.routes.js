//rutas de autenticacion

import {Router} from "express"
import { register, test,login } from "../auth/auth.cotroller.js"
import { validatejwt } from "../../middlewares/validate.jwt.js"
import { registerValidator } from "../../middlewares/validators.js"
import { uploadPorfilePicture } from "../../middlewares/multer.upload.js"
import { deleteFileOnError } from "../../middlewares/delete.file.one.errors.js"
const api = Router()


//rutas publicas


api.post('/register',[uploadPorfilePicture.single("profilePicture"),
                     registerValidator,
                     deleteFileOnError],register)
api.post('/login',login)



//rutas privadas
api.get('/test',test)

export default api