import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import moment from 'moment';
import 'moment/locale/pt-br';

import { auth, db } from '../firebaseConfig';
import {
  doc,
  getDoc,
  collection,
  setDoc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';



const ScheduleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { doctor } = route.params || {};
  const doctorId = doctor?.id;
const doctorName = doctor?.name;


  const [selectedDate, setSelectedDate] = useState(moment());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weekDays, setWeekDays] = useState([]);

  const [showModal, setShowModal] = useState(false);

  // Estado para dados do paciente editáveis
  const [patientInfo, setPatientInfo] = useState({
    nome: '',
    dataNascimento: '',
    genero: '',
    cpf: '',
    peso: '',
    altura: '',
    email: '',
    telefone: '',
  });

  // Carrega os próximos 7 dias para seleção
  useEffect(() => {
    const days = [];
    const today = moment();
    for (let i = 0; i < 7; i++) {
      const day = moment(today).add(i, 'days');
      days.push({
        date: day,
        dayName: day.format('ddd').toUpperCase(),
        dayNumber: day.format('D'),
      });
    }
    setWeekDays(days);
    setSelectedDate(today);

    // Horários fictícios para demonstração
    setAvailableTimes([
      { time: '08:00', booked: false },
      { time: '09:00', booked: false },
      { time: '10:00', booked: false },
      { time: '14:00', booked: false },
      { time: '15:00', booked: false },
    ]);
  }, []);

  // Busca dados do usuário logado para preencher o formulário do paciente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPatientInfo({
            nome: data.nome || '',
            dataNascimento: data.nascimento || '',
            genero: data.genero || '',
            cpf: data.cpf || '',
            peso: data.peso || '',
            altura: data.altura || '',
            email: auth.currentUser.email || '',
            telefone: data.telefone || '',
          });
        } else {
          setPatientInfo((prev) => ({
            ...prev,
            email: auth.currentUser.email || '',
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  // Função simulada para agendar, agora só mostra o modal ao invés de salvar de verdade
  const handleScheduleAppointment = async () => {
    if (!selectedTime) {
      Alert.alert('Aviso', 'Por favor, selecione um horário para a consulta.');
      return;
    }

    setLoading(true);
    // Simula requisição demorando 1 segundo
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigation.navigate('Home');
  };

  const timeOptions = availableTimes.map((timeSlot) => ({
    key: timeSlot.time,
    value: timeSlot.time,
  }));

  const renderDayItem = (day, index) => {
    const isSelected = selectedDate && day.date.isSame(selectedDate, 'day');

    return (
      <TouchableOpacity
        key={index}
        style={[styles.dayItem, isSelected && styles.selectedDayItem]}
        onPress={() => setSelectedDate(day.date)}
      >
        <Text style={[styles.dayName, isSelected && styles.selectedDayText]}>{day.dayName}</Text>
        <Text style={[styles.dayNumber, isSelected && styles.selectedDayText]}>{day.dayNumber}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova consulta</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dateSection}>
          <Text style={styles.sectionTitle}>{selectedDate.format('MMMM, YYYY')}</Text>
          <View style={styles.daysContainer}>{weekDays.map(renderDayItem)}</View>
        </View>

        <View style={styles.timesSection}>
          <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#00C853" />
          ) : timeOptions.length > 0 ? (
            <ScrollView style={styles.pickerContainer}>
              {timeOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[styles.timeItem, selectedTime === option.value && styles.selectedTimeItem]}
                  onPress={() => setSelectedTime(option.value)}
                >
                  <Text style={[styles.timeText, selectedTime === option.value && styles.selectedTimeText]}>
                    {option.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noTimesText}>Não há horários disponíveis para esta data</Text>
          )}
        </View>

        <View style={styles.patientInfoSection}>
          <Text style={styles.sectionTitle}>Detalhes do Paciente</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nome Completo</Text>
            <TextInput
              style={styles.infoValue}
              value={patientInfo.nome}
              onChangeText={(text) => setPatientInfo((prev) => ({ ...prev, nome: text }))}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Data de Nascimento</Text>
            <TextInput
              style={styles.infoValue}
              value={patientInfo.dataNascimento}
              onChangeText={(text) => setPatientInfo((prev) => ({ ...prev, dataNascimento: text }))}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gênero</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[styles.genderButton, patientInfo.genero === 'Masculino' && styles.selectedGender]}
                onPress={() => setPatientInfo((prev) => ({ ...prev, genero: 'Masculino' }))}
              >
                <Text style={[styles.genderText, patientInfo.genero === 'Masculino' && styles.selectedGenderText]}>
                  Masculino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, patientInfo.genero === 'Feminino' && styles.selectedGender]}
                onPress={() => setPatientInfo((prev) => ({ ...prev, genero: 'Feminino' }))}
              >
                <Text style={[styles.genderText, patientInfo.genero === 'Feminino' && styles.selectedGenderText]}>
                  Feminino
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>CPF</Text>
            <TextInput
              style={styles.infoValue}
              value={patientInfo.cpf}
              onChangeText={(text) => setPatientInfo((prev) => ({ ...prev, cpf: text }))}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Peso</Text>
            <TextInput
              style={styles.infoValue}
              value={patientInfo.peso}
              onChangeText={(text) => setPatientInfo((prev) => ({ ...prev, peso: text }))}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Altura</Text>
            <TextInput
              style={styles.infoValue}
              value={patientInfo.altura}
              onChangeText={(text) => setPatientInfo((prev) => ({ ...prev, altura: text }))}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>E-mail</Text>
            <TextInput
              style={styles.infoValue}
              value={patientInfo.email}
              onChangeText={(text) => setPatientInfo((prev) => ({ ...prev, email: text }))}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <TextInput
              style={styles.infoValue}
              value={patientInfo.telefone}
              onChangeText={(text) => setPatientInfo((prev) => ({ ...prev, telefone: text }))}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={handleScheduleAppointment}
        disabled={loading || !selectedTime}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.scheduleButtonText}>Agendar Consulta</Text>
        )}
      </TouchableOpacity>

      {/* Modal de confirmação */}
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>CONSULTA AGENDADA</Text>
            <Text style={styles.modalDoctor}>{doctorName || 'Dr. Douglas Alves'}</Text>
            <Text style={styles.modalSpecialty}>Nutricionista</Text>
            <Text style={styles.modalDate}>{selectedDate.format('DD/MM/YYYY')}</Text>
            <Text style={styles.modalTime}>{selectedTime}</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00C853',
  },
  dateSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dayItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    width: 45,
  },
  selectedDayItem: {
    backgroundColor: '#00C853',
  },
  dayName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
  },
  timesSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
    maxHeight: 180,
  },
  timeItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  selectedTimeItem: {
    backgroundColor: 'rgba(0, 200, 83, 0.1)',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTimeText: {
    color: '#00C853',
    fontWeight: 'bold',
  },
  noTimesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
  },
  patientInfoSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 100,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedGender: {
    backgroundColor: '#00C853',
    borderColor: '#00C853',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  selectedGenderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scheduleButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#00C853',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos do modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // fundo escuro e transparente
    justifyContent: 'center',
    alignItems: 'center',
    // iOS blur workaround (não pode ser blur real, mas dá o efeito)
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    color: '#00C853',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  modalDoctor: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalSpecialty: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  modalDate: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  modalTime: {
    fontSize: 14,
    marginBottom: 16,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#00C853',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ScheduleScreen;
