//Lenvantar el servidor express(HTTP)


//Modular / + efectiva + legible / trabaja en funciones

'use strict'

//ECModules/ ESModules

import express from 'express'//Servidor HTTP
import morgan from 'morgan'//logs
import helmet from 'helmet'//Seguridad para HTTP
import cors from 'cors'//Acceso al API
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
//import animalRoutes from '../src/animal/animal.routes.js'
import { limiter } from '../middlewares/rate.limit.js'
import animalRoutes from '../src/animal/animal.routes.js'
import appointmentRouter from '../src/appoinment/appintment.routes.js'


//cofiugaraciones  de express
const configs = (app)=>{
    app.use(express.json())//Aceptar y enviar datos en Json
    app.use(express.urlencoded({extended:false}))//No encripta la URL
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)//valida las solicitudes en x tiempo
}

 const routes =(app)=>{
    app.use(authRoutes)
    app.use(userRoutes)
    app.use(animalRoutes)
    app.use(appointmentRouter)

}   

//Ejecutamos el servidor
export const initServer =()=>{
    const app = express()//Instancia de express
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`server running in port ${process.env.PORT}`)
    } catch (err) {
        console.log('server init faild',err)
    }
}