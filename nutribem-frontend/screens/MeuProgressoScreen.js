import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import moment from "moment";

export default function ProgressScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    nome: "",
    nascimento: "",
    peso: "",
    altura: "",
    genero: "Masculino",
  });

  const [idade, setIdade] = useState(0);
  const [imc, setImc] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const nascimento = data.nascimento || "";
        const idadeCalculada = nascimento
          ? moment().diff(moment(nascimento, "DD/MM/YYYY"), "years")
          : "";

        setUserData({
          nome: data.nome || "",
          nascimento,
          peso: data.peso || "",
          altura: data.altura || "",
          genero: data.genero || "Masculino",
        });
        setIdade(idadeCalculada);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    calcularIMC();
  }, [userData]);

  const calcularIMC = () => {
    const peso = parseFloat(userData.peso);
    const altura = parseFloat(userData.altura) / 100;
    if (!peso || !altura) return;

    const imcCalculado = peso / (altura * altura);
    setImc(imcCalculado.toFixed(1));

    if (imcCalculado < 18.5) {
      setCategoria("Magreza");
      setStatus("Abaixo do peso");
    } else if (imcCalculado < 25) {
      setCategoria("Normal");
      setStatus("Ótimo!");
    } else if (imcCalculado < 30) {
      setCategoria("Sobrepeso");
      setStatus("Atenção");
    } else if (imcCalculado < 35) {
      setCategoria("Obesidade I");
      setStatus("Cuidado");
    } else if (imcCalculado < 40) {
      setCategoria("Obesidade II");
      setStatus("Perigo");
    } else {
      setCategoria("Obesidade III");
      setStatus("Emergência");
    }
  };

  const handleInput = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const calculateIndicatorPosition = () => {
  const v = parseFloat(imc);
  if (v < 18.5) return 8;
  if (v < 25) return 24;
  if (v < 30) return 42;
  if (v < 35) return 60;
  if (v < 40) return 78;
  return 92;
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#00B140" />
        </TouchableOpacity>
        <Text style={styles.title}>Meu Progresso</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* Dados */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={userData.nome}
            onChangeText={(text) => handleInput("nome", text)}
          />
        </View>

        <View style={styles.doubleInput}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={userData.peso}
              onChangeText={(text) => handleInput("peso", text)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={userData.altura}
              onChangeText={(text) => handleInput("altura", text)}
            />
          </View>
        </View>

        <View style={styles.doubleInput}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
              style={styles.input}
              value={userData.nascimento}
              onChangeText={(text) => handleInput("nascimento", text)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={styles.input}
              value={String(idade)}
              editable={false}
            />
          </View>
        </View>

        <Text style={styles.imcTitle}>IMC</Text>
        <Text style={styles.category}>{categoria}</Text>
        <Text style={styles.status}>{status}</Text>
        <Text style={styles.imcValue}>{imc}</Text>

        {/* Barra de IMC */}
        <View style={styles.barContainer}>
          <View style={[styles.bar, { backgroundColor: "#00C8F8" }]} />
          <View style={[styles.bar, { backgroundColor: "#00B140" }]} />
          <View style={[styles.bar, { backgroundColor: "#FFD600" }]} />
          <View style={[styles.bar, { backgroundColor: "#FF9800" }]} />
          <View style={[styles.bar, { backgroundColor: "#F44336" }]} />
          <View style={[styles.bar, { backgroundColor: "#B71C1C" }]} />
          <View style={[styles.indicator, { left: `${calculateIndicatorPosition()}%`}]} />
        </View>

        {/* Legenda */}
        <View style={{ marginTop: 20 }}>
          {[
            ["Magreza", "<18.5", "#00C8F8"],
            ["Normal", "18.5-24.9", "#00B140"],
            ["Sobrepeso", "25-29.9", "#FFD600"],
            ["Obesidade I", "30-34.9", "#FF9800"],
            ["Obesidade II", "35-39.9", "#F44336"],
            ["Obesidade III", ">40", "#B71C1C"],
          ].map(([label, range, color]) => (
            <View style={styles.legendItem} key={label}>
              <View style={[styles.legendDot, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{label}</Text>
              <Text style={styles.legendRange}>{range}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  title: { fontSize: 20, color: "#00B140", fontWeight: "bold" },
  inputGroup: { marginBottom: 16 },
  doubleInput: { flexDirection: "row", marginBottom: 16 },
  label: { color: "#444", marginBottom: 4, fontWeight: "bold" },
  input: {
    backgroundColor: "#F5F7FA",
    borderRadius: 8,
    padding: 10,
    color: "#000",
  },
  imcTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00B140",
    marginTop: 20,
    textAlign: "center",
  },
  category: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  status: { textAlign: "center", color: "#FF9800", fontWeight: "bold" },
  imcValue: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "bold",
    color: "#111",
  },
  barContainer: {
  flexDirection: 'row',
  width: '100%',
  height: 20,
  borderRadius: 10,
  overflow: 'hidden',
  marginTop: 10,
  backgroundColor: '#eee',
  position: 'relative', // MUITO IMPORTANTE PARA A SETA FUNCIONAR
},
  bar: { flex: 1 },
  indicator: {
    position: "absolute",
    top: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#111",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: { flex: 1, color: "#333" },
  legendRange: { color: "#888" },
  indicator: {
  position: 'absolute',
  top: 10, 
  zIndex: 10,
  width: 0,
  height: 0,
  borderLeftWidth: 8,
  borderRightWidth: 8,
  borderBottomWidth: 12,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: '#111', 
},

});
