import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointments.js";
import doctorRoutes from "./routes/doctors.js";
import availabilityRoutes from "./routes/availability.js";

    
const app = express();
app.use(cors());
app.use(express.json());

app.use("/appointments", appointmentRoutes);
app.use("/doctors", doctorRoutes);
app.use("/availability", availabilityRoutes);

app.get("/", (req, res) => res.send("NutriBem API rodando!"));

app.listen(3001, () => console.log("Servidor backend na porta 3001"));
