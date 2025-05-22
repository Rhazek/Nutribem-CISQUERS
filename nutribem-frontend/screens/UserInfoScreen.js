import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo icons if not already


export default function UserInfoScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [genero, setGenero] = useState("Masculino");

  const handleSave = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    await updateDoc(doc(db, "users", uid), {
      nome,
      cpf,
      peso,
      altura,
      nascimento,
      genero,
    });
    navigation.navigate("Home");
  };

  const isFormValid = () => {
    return (
      nome.trim() !== "" &&
      cpf.trim() !== "" &&
      peso.trim() !== "" &&
      altura.trim() !== "" &&
      nascimento.trim().length === 10 &&
      genero.trim() !== ""
    );
  };

  function maskCPF(value) {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14); // Limita ao tamanho máximo do CPF com máscara
  }

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.logoContainer}>
        <View style={styles.logoContent}>
          <Image
            source={require("../assets/images/leaf-icon-green.png")}
            style={styles.leafIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>NutriBem</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#00B140" />
          </TouchableOpacity>
          <Text style={styles.title}>Suas informações</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Nome Completo</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
          </View>

          <Text style={styles.inputLabel}>CPF</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="000.000.000-00"
              keyboardType="numeric"
              maxLength={14}
              onChangeText={(text) => setCpf(maskCPF(text))}
              value={cpf}
              style={styles.input}
            />
          </View>

          <Text style={styles.inputLabel}>Gênero</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                genero === "Masculino" && styles.genderSelected,
              ]}
              onPress={() => setGenero("Masculino")}
            >
              <Text
                style={
                  genero === "Masculino"
                    ? styles.genderTextSelected
                    : styles.genderText
                }
              >
                Masculino
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                genero === "Feminino" && styles.genderSelected,
              ]}
              onPress={() => setGenero("Feminino")}
            >
              <Text
                style={
                  genero === "Feminino"
                    ? styles.genderTextSelected
                    : styles.genderText
                }
              >
                Feminino
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Altura</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="(Ex: 1.70m)"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(text) => {
                const formattedText = text.replace(",", ".");
                setAltura(formattedText);
              }}
              value={altura}
              style={styles.input}
            />
          </View>

          <Text style={styles.inputLabel}>Peso</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="(Ex: 65kg)"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(text) => {
                const formattedText = text.replace(",", ".");
                setPeso(formattedText);
              }}
              value={peso}
              style={styles.input}
            />
          </View>

          <Text style={styles.inputLabel}>Data de nascimento</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="00/00/0000"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => {
                const formattedText = text.replace(/[^0-9/]/g, "");
                setNascimento(formattedText);

                if (formattedText.length === 10) {
                  const [day, month, year] = formattedText.split("/");
                  const date = new Date(year, month - 1, day);
                  if (date.getFullYear() < 1900 || date > new Date()) {
                    setNascimento("");
                  }
                }

                if (formattedText.length === 2 || formattedText.length === 5) {
                  setNascimento((prev) => prev + "/");
                }

                if (formattedText.length > 10) {
                  setNascimento((prev) => prev.slice(0, 10));
                }
              }}
              value={nascimento}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              !isFormValid() && { backgroundColor: "#ccc" },
            ]}
            onPress={handleSave}
            disabled={!isFormValid()}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    width: "100%",
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  leafIcon: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  logoText: {
    color: "#00B140",
    fontSize: 28,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B140',
    textAlign: 'center',
    marginRight: 30, // Offset to center the text with back button
  },
  formContainer: {
    width: "100%",
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#F5F7FA",
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    height: 48,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
  },
  genderButton: {
    flex: 1,
    backgroundColor: "#eee",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 6,
    alignItems: "center",
    elevation: 2,
  },
  genderSelected: {
    backgroundColor: "#00B140",
  },
  genderText: {
    color: "#555",
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#00B140",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
