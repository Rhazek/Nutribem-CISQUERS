import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

export default function DoctorsScreen({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3001/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Erro ao buscar nutricionistas", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderDoctor = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DoctorProfile", { doctorId: item.id })
      }
    >
      <Image source={{ uri: item.photoUrl }} style={styles.photo} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.specialty}>{item.specialty}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#00B140" />
          </TouchableOpacity>
          <Text style={styles.title}>Agendar Consulta</Text>
        </View>
      <TextInput
        placeholder="Procurar por médicos"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={renderDoctor}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B140',
    textAlign: 'center',
    marginRight: 30, 
  },
  searchInput: {
    backgroundColor: "#F5F7FA",
    padding: 12,
    borderRadius: 50,
    marginBottom: 20,
  },
  list: { justifyContent: "space-between" },
  card: {
    backgroundColor: "#f7f9fb",
    borderRadius: 10,
    flex: 1,
    margin: 8,
    padding: 15,
    alignItems: "center",
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 12,
    color: "#777",
  },
});