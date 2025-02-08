//validar los tokens
'use strict'

import jwt from 'jsonwebtoken'

export const validatejwt = async (req,res,next) => {
    try {
        //obtener la llave de acceso privada al token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los headers (cabeceras)
        let {authorization} = req.headers

        if(!authorization) return res.status(401).send({message:'unauthorized'})
        let user=jwt.verify(authorization,secretKey)
        //inyectar en la solicitud un nuevo parametro
        req.user = user
        //next()=todo salio bien por aca, que pase a la siguiente funcion
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message:'Invalid credentials'})
    }
}