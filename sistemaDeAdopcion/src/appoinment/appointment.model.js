import mongoose from "mongoose";

const AppointmentSchema = mongoose.Schema(

    {
        name:{
            type:String,
            required:[true,'Name Appointment is required']
    
        },
    
        description:{
            type:String,
            maxLength:[100,`can not be overcome 50 characters`]
    
        },
    
        appointment: {
            type: Date,
            required: [true, 'write the date']
        },

        state: {
            type: String,
            enum:['pending','Complete','Cancelled'],
            default: 'pending'
        },

        pet:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Animal',
            required: [ true, 'the id of the pet is required']
        },
       
        keeper:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'the id of the keeper is required']
        }

    }
    


);

export default mongoose.model('Appointment', AppointmentSchema);