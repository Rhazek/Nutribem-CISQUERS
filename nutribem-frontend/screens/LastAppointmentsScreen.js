import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const appointmentsMock = [
  {
    id: "1",
    name: "Douglas Alves",
    specialty: "Nutricionista",
    date: "12/03/2025",
    time: "09h00",
    photo: require("../assets/images/doctor-example.png"),
    phone: "+5511999999999", 
  },
  {
    id: "2",
    name: "Kim Zawa",
    specialty: "Nutricionista",
    date: "02/02/2025",
    time: "10h30",
    photo: require("../assets/images/kim-zawa.png"), 
    phone: "+5511988888888",
  },
];

export default function LastAppointmentsScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  // Filtra por nome ou especialidade
  const filteredAppointments = appointmentsMock.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.specialty.toLowerCase().includes(searchText.toLowerCase())
  );

  const openWhatsApp = (phone) => {
    const url = `whatsapp://send?phone=${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          alert("WhatsApp não está instalado no dispositivo.");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("Erro ao abrir WhatsApp:", err));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.photo} style={styles.photo} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => openWhatsApp(item.phone)}
      >
        <Text style={styles.chatButtonText}>INICIAR CHAT</Text>
        <Ionicons name="logo-whatsapp" size={20} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#00B140" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Últimos atendimentos</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#999" style={{ marginLeft: 12 }} />
        <TextInput
          placeholder="Pesquisas"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#00B140",
    fontWeight: "bold",
    fontSize: 18,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    height: 40,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingHorizontal: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#040404",
  },
  specialty: {
    color: "#00B140",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  date: {
    color: "#444",
    fontSize: 13,
  },
  time: {
    color: "#444",
    fontSize: 13,
  },
  chatButton: {
    backgroundColor: "#00B140",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 3,
  },
  chatButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
