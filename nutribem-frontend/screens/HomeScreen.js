import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();

  const logout = () => {
    auth.signOut().then(() => navigation.navigate("Login"));
  };

  const nextAppointment = {
    doctorName: "Dr. Douglas Alves",
    specialty: "Nutricionista",
    date: "23/05/2025",
    time: "09h00",
    photo: require("../assets/images/doctor-example.png"),
  };

  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.logoContent}>
          <Image
            source={require("../assets/images/leaf-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>NutriBem</Text>
        </View>

        <View style={styles.iconsRight}>
          <Ionicons
            name="notifications-outline"
            size={28}
            color="#FFF"
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate("Notifications")}
          />

          <Ionicons
            name="person-circle-outline"
            size={32}
            color="#FFF"
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Agende agora sua consulta!</Text>
        <Text style={styles.subtitle}>
          Mais de 20 nutricionistas estão prontos para te ajudar.
        </Text>

        {/* Barra de Pesquisa */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={{ marginLeft: 12, marginRight: 8 }}
          />
          <TextInput
            placeholder="Procurar por nutricionistas"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => navigation.navigate("Doctors")}
          />
        </View>

        {/* Próximo Atendimento */}
        {nextAppointment && (
          <View style={styles.tituloSecao}>
            <Text style={styles.tituloSecaoTexto}>Próximo atendimento</Text>
            <View style={styles.appointmentCard}>
              <Image
                source={nextAppointment.photo}
                style={styles.doctorPhoto}
              />
              <View style={styles.appointmentInfo}>
                <Text style={styles.doctorName}>
                  {nextAppointment.doctorName}
                </Text>
                <Text style={styles.specialty}>
                  {nextAppointment.specialty}
                </Text>
                <Text style={styles.appointmentDate}>
                  {nextAppointment.date}
                </Text>
                <Text style={styles.appointmentTime}>
                  {nextAppointment.time}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Botões */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Doctors")}
        >
          <Text style={styles.buttonText}>Agendar Consulta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LastAppointments")}
        >
          <Text style={styles.buttonText}>Últimos Atendimentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MeuProgresso")}
        >
          <Text style={styles.buttonText}>Meu Progresso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Meu Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    backgroundColor: "#00B140",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logo: { width: 40, height: 25 },
  logoContent: { flexDirection: "row", alignItems: "center" },
  logoText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  iconsRight: { flexDirection: "row", alignItems: "center" },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    color: "#00B140",
    fontWeight: "bold",
    marginBottom: 6,
  },
  tituloSecaoTexto: {
    fontSize: 15,
    color: "#040404",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 50,
    height: 40,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: "#000",
    fontSize: 14,
  },
  appointmentCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    padding: 15,
    marginBottom: 24,
    alignItems: "center",
  },
  doctorPhoto: {
    width: 60,
    height: 60,
    borderRadius: 36,
    marginRight: 16,
  },
  appointmentInfo: { flex: 1 },
  doctorName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  specialty: {
    color: "#00B140",
    fontSize: 14,
    marginBottom: 2,
  },
  appointmentDate: {
    color: "#444",
    fontSize: 13,
  },
  appointmentTime: {
    color: "#444",
    fontSize: 13,
  },
  button: {
    backgroundColor: "#00B140",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#00B140",
    fontWeight: "bold",
  },
});
