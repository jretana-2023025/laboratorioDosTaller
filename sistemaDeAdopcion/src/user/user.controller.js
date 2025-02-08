//Gestionar un perfil existente de usuario
import User from './user.model.js';
import { encrypt } from '../../utils/encryp.js';
import  argon  from 'argon2';

export const addUser = async(req,res)=>{
    try {
        let data = req.body
        let user = new User(data)
          user.password = await encrypt(user.password)
           user.role= "CLIENTE"
        await user.save()
        //responder al usuario
        return res.send({message:`Registered succesfully, can be loggede with username: ${user.username}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'general error with reistering user',err})
    }
}

//Listar 
export const listUser = async (req,res) => {
   try {
    //configuraciones de paginacion
    const {limit=20, skip=0}=req.query
    
    //consultar
    let users=await User.find()
    .skip(skip)
    .limit(limit)
    
    if(users.length==0){
        return res.status(404).send(
            {
                success:false,
                message:'Users not found'
            }
        )
    }
    return res.send(
        {
            success:true,
            message:'Users found',
            users
        }
    )
    
   } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error',error})
   }
   
}

//buscar por id
export const buscarPorId = async (req,res) => {
    try {
        let {id}=req.params
     let user=await User.findById(id)
     if(!user) return res.status(404).send(

        {
            success:false,
            message:'User not found',
            user
        }

     )
     return res.send(

        {
            success:true,
            message:'User found',
            user
        })
     
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:true,
                message:'general error',
                error
            }
         )
         
     
 }
}


    export const updatePassword =async (req, res) => {
        try {
            let {id}=req.params
            let {newPassword,oldPassword}=req.body
            let user = await User.findById(id);
            if(!user) return res.status(404).send({message:'User not found: '})
            let compare =await argon.verify( user.password,oldPassword)
            if(!compare) return res.status(400).send({message:'Incorrect Password'})
            user.password = await encrypt(newPassword)
            await user.save()
            return res.send({message:'Password updated succesfully:'})
        } catch (error) {
            console.error(error)
            return res.status(500).send({message:'Internal Error server',error})
        }
    }

 //actualizar
export const updateUser = async (res,req) => {
    try {
        let id=req.params.id
        let data=req.body
        let updateUser =await User.findByIdAndUpdate(id,data,{new:true})
        if(!updateUser)return res.status(404).send({message:'User not found'})
            return res.send({message:'User updated successfully',updateUser})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error',error})
    }
    
}

export const deleteUser = async (res,req) => {
    try {
        let id=req.params.id
        let deleteduser =await User.findByIdAndDelete(id)
        if(!deleteduser)return res.status(404).send({message:'User not found'})
            return res.send({message:'User deleted successfully',updateUser})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error',error})
    }
    
}