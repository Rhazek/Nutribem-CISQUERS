import { db } from "../firebaseAdmin.js";

const createAppointment = async (req, res) => {
  try {
    const data = req.body;
    const ref = await db.collection("appointments").add(data);
    res.status(201).send({ id: ref.id });
  } catch (err) {
    res.status(500).send({ error: "Erro ao agendar consulta" });
  }
};

const getAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection("appointments").where("userId", "==", userId).get();
    const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(appointments);
  } catch (err) {
    res.status(500).send({ error: "Erro ao buscar consultas" });
  }
};

export { createAppointment, getAppointments };
