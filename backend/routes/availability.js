import express from "express";
import { getAvailabilityByDoctor } from "../controllers/availabilityController.js";

const router = express.Router();

router.get("/:id", getAvailabilityByDoctor);

export default router;
