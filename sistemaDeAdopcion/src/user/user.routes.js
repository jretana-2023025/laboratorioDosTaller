import { Router } from "express";
import { addUser, buscarPorId, deleteUser, listUser, updateUser,updatePassword} from "./user.controller.js";

const api = Router();

//Definir la ruta 'add bajo '/User/add

api.post('/addUser',addUser)
api.get('/getUser',listUser)
api.get('/getById/:id',buscarPorId)
api.put('/updateUser/:id',updateUser)
api.delete('/deleteUser/:id',deleteUser)
api.put('/updatePasswordById/:id',updatePassword)
export default api