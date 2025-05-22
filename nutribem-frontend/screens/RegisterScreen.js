import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; 

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        setDoc(doc(db, "users", uid), { email, nome });
        navigation.navigate("UserInfo");
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.outerContainer}>
      <StatusBar backgroundColor="#00B140" barStyle="light-content" />
      
      {/* Green logo section at the top */}
      <View style={styles.logoContainer}>
        <View style={styles.logoContent}>
          <Image 
            source={require('../assets/images/leaf-icon.png')} 
            style={styles.leafIcon} 
            resizeMode="contain"
          />
          <Text style={styles.logoText}>NutriBem</Text>
        </View>
      </View>
      
      {/* Content area */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#00B140" />
          </TouchableOpacity>
          <Text style={styles.title}>Cadastro</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Nome Completo</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
          </View>
          
          <Text style={styles.inputLabel}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="••••••••"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              style={styles.input}
            />
          </View>
          
          <Text style={styles.inputLabel}>Confirmar Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="••••••••"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
              style={styles.input}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Já possui uma conta?{' '}
            </Text>
            <Text 
              style={styles.loginLink}
              onPress={() => navigation.navigate("Login")}
            >
              ENTRAR
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#00B140', // The entire app background is green
  },
  logoContainer: {
    backgroundColor: '#00B140',
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leafIcon: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
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
    marginRight: 30, // Offset to center the text with back button
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#F5F7FA',
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    height: 48,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00B140',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#333',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00B140',
  },
});