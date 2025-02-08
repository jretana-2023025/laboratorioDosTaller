import { Router } from "express"
import {addAnimal,listAnimal,getAnimalById,updateAnimal,deleteAnimal} from './animal.controller.js'

const api = Router();

api.post('/addAnimal', addAnimal)
api.get('/listAnimal', listAnimal)
api.get('/getAnimalById/:id', getAnimalById)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)

export default api;