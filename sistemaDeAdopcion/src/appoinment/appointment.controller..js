'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from '../appoinment/appointment.model.js'

export const getAppointment = async (req, res) => {
    try {


        let { name, description, appointment, pet,  keeper } = req.body;
        if (!name || !appointment || !pet || !keeper) {
            return res.status(400).send({ message: 'Name, Date, and Pet are required' });
        }

        const appointmentConvert = new Date(appointment).toISOString().split('T')[0];
        let existingAppointment = await Appointment.findOne({
            appointment: {
                $gte: new Date(appointmentConvert),
                $lt: new Date(new Date(appointmentConvert).setDate(new Date(appointmentConvert).getDate() + 1))
            }
        });


        if (existingAppointment) {
            return res.status(400).send({ message: 'already exist an appointment on this date' });
        }


        let animalAppointment = await Appointment.findOne({ pet });
        if (animalAppointment) {
            return res.status(400).send({ message: 'This pet already has an appointment' });
        }

        let animalExists = await Animal.findById(pet);
        if (!animalExists) {
            return res.status(404).send({ message: 'pet not found' });
        }


        let newAppointment = new Appointment({ name, description, appointment, pet,  keeper });
        await newAppointment.save();

        return res.status(201).send({ message: 'the appointment has been created successfully', newAppointment });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'general error in appointment', error });
    }
}
