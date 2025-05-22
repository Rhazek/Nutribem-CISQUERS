import express from "express";
import { createAppointment, getAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/:userId", getAppointments);

export default router;
