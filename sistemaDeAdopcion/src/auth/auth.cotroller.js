//Gestionar la logica de autenticacion
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'
import User from '../user/user.model.js'
import { hash } from 'argon2'


export const test = (req,res)=>{
    console.log('test is running')
    res.send({message: 'test is runnig'})
}

//Register

export const register = async(req,res)=>{
    try {
        //capturar los datos
        let data = req.body
        //crear el objeto del modelo agregandole los datos caturados
        let user = new User(data)
        //encriptar la password
        user.password = await encrypt(user.password)
        //asignar role por defecto
        user.role= "CLIENTE"
        //asignanr profilePicture
        user.profilePicture = req.file.filename ?? null 
        //guardar
        await user.save()
        //responder al usuario
        return res.send({message:`Registered succesfully, can be loggede with username: ${user.username}`})
    } catch (err) {
        return res.status(500).send({message:'general error with reistering user',err})
    }
}

//Login
export const login = async(req,res)=>{
    try {
        //Capturar los datos(body)
        let {userLogin,password} =req.body
        //validar que el usuario exista
        let user =await User.findOne(
            {
                $or:[//sufuncion OR un [] de busquedas
                    {email: userLogin},
                    {username:userLogin}
                ]
            }
        )//{username}= {username:username}
        //verificar que la contrasena coincida
        if(user && await checkPassword(user.password,password)){
       

        // generar el token
        let loggerUser ={
            uid:user._id,
            username: user.username,
            name: user.name,
            role: user.role
        }
        
          let token = await generateJwt(loggerUser)
          return res.send({
            message:`welcome${user.name}`,
            loggerUser,
            token
          })
        
    }
        //Responder al usuario
        return res.status(400).send({message:`Invalid credentials`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error with login',err})
        
    }
}
