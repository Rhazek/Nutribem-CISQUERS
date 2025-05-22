import { db } from "../firebaseAdmin.js";

const getDoctors = async (req, res) => {
  try {
    const snapshot = await db.collection("doctors").get();
    const doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar nutricionistas" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection("doctors").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Nutricionista não encontrado" });
    }

    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar nutricionista" });
  }
};

export { getDoctors, getDoctorById };
