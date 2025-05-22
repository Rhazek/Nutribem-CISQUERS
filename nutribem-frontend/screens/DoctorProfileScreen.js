import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons"; 

export default function DoctorProfileScreen({ route, navigation }) {
  const { doctorId } = route.params;
  const [doctor, setDoctor] = useState(null);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`http://localhost:3001/doctors/${doctorId}`);
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      console.error("Erro ao buscar nutricionista", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  if (!doctor) return <Text>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#00B140" />
          </TouchableOpacity>

      <Image source={{ uri: doctor.photoUrl }} style={styles.photo} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>{doctor.specialty}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{doctor.patientsCount}+ </Text>
          <Text>Pacientes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{doctor.experienceYears}</Text>
          <Text>Anos Experiência</Text>
        </View>
      </View>

      <Text style={styles.titulo}>Sobre o nutricionista</Text>
      <Text style={styles.description}>{doctor.description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Schedule", { doctor })}
      >
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 5,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 35,
    marginBottom: 10
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#666',
    textAlign: 'justify',
    marginBottom: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#00B140'
  },
  specialty: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
    marginBottom: 20
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#00B140'
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#00B140',
    paddingVertical: 14,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  }
});
