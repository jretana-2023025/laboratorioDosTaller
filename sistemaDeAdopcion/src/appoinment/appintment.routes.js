import { Router } from "express";
import { getAppointment } from "./appointment.controller..js";

const api = Router();

api.post('/appointment',getAppointment)
export default api