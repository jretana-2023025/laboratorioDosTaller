import {Schema, model} from 'mongoose'

const userSchema = Schema (
    {
        name:{
            type: String,
            //Mongo validatons (niddleware / intermediario que valida el parametro antes de guardar)
            required:[true,'name is required'],
            maxLength:[25,`can not be overcome 25 characters`]
        },
        surname:{
            type:String,
            required:[true,'surname is required'],
            maxLength:[25,`can not be overcome 25 characters`]
        },
        username:{
            type:String,
            required:[true,'username is required'],
           unique:[true,'this username is already exist'],
           lowercase:true,
           maxLength:[15,`can not be overcome 15 characters`]
            
        },
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:true
            //validacion personalizada:
            //match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g]//Regex expesion para validar email

        },
        password:{
            type:String,
            required:[true,'password is required'],
            minLength:[8,'Password must be 8 characters'],
            maxlength:[100,'can not be overcome 16 characters'],
            //match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm]
        },

        profilePicture:{
            type:String

        },
        phone:{
            type:String,
            required:[true,'Phone is required'],
            minLength:[8,`can not be overcome 8 characters`],
            maxlength:[15,'Phone must be 13 numbers'],
           // match:[/^\+[0-9]{1,3} [0-9]{3,5}-[0-9]{4}$/]
        },
        role:{
            type:String,
            required:[true,'Role is required'],
            uppercase:true,
            enum:['ADMIN','CLIENTE']
        }


    }
)

//Modificar el to JSON -> toObject para excluir datos en la respuesta
userSchema.methods.toJSON =function(){
    const { __v,password, ...user}=this.toObject()//sirve para convertir un documento de mongodb a objeto de js
    return user
}


//Crea y exporta el modelo
export default model('User',userSchema)