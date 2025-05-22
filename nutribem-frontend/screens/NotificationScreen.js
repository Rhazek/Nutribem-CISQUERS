import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationScreen() {
  const navigation = useNavigation();

  const notifications = [
    {
      id: '1',
      title: 'Lembrete:',
      description:
        'consulta com o nutricionista Douglas Alves no dia 15/03/2025 às 15h30.',
      time: '20h41',
      image: require('../assets/images/doctor-example.png'),
    },
    {
      id: '2',
      title: 'Lembrete:',
      description:
        'não se esqueça da sua primeira refeição às 07h30, seguindo seu plano alimentar.',
      time: '07h00',
      image: require('../assets/images/food-example.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text>
                <Text style={styles.title}>{item.title} </Text>
                <Text style={styles.description}>{item.description}</Text>
              </Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00B140',
    textAlign: 'center',
    marginRight: 24,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#00B140',
    fontWeight: 'bold',
  },
  description: {
    color: '#333',
    fontWeight: '500',
  },
  time: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
});
