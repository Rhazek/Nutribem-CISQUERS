import { db } from "../firebaseAdmin.js";

const getAvailabilityByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const docSnap = await db.collection("doctors").doc(doctorId).get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Nutricionista não encontrado" });
    }

    console.log("Document data:", docSnap.data());

    const data = docSnap.data();

    if (!data.availability) {
      return res.status(404).json({ error: "Disponibilidade não encontrada" });
    }

    const availabilityMap = data.availability;

    console.log("Disponibilidade do nutricionista:", availabilityMap);
    

    // Converter o objeto (mapa) em array
    const availability = Object.values(availabilityMap);

    res.status(200).json(availability);
  } catch (error) {
    console.error("Erro no getAvailabilityByDoctor:", error);
    res.status(500).json({ error: error.message || "Erro ao buscar disponibilidade" });
  }
};

export { getAvailabilityByDoctor };
