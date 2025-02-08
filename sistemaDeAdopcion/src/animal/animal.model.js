import { Schema,model } from "mongoose";

const animalSchema= Schema(
    {
        name:{
            type: String,
            required:[true,'name is required'],
            maxLength:[25,`can not be overcome 25 characters`]

        },

        especie:{
            type: String,
            required:[true,'especie is required'],
            maxLength:[15,`can not overcome 15 characters`]
        },
        raza:{
            type: String,
            maxLength:[25,`can not overcome 25 characters`]
        },
        edadAproximada:{
            type: Number,
            required:[true,'years old is required'],
            
        },
        sexo:{
            type: String,
            required:[true,'sexo is required'],
            maxLength:[10,`can not overcome 10 characters`]
        }
    }
)

export default model('Animal',animalSchema)