import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => navigation.navigate("Home"))
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
        <Text style={styles.title}>Entrar</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="E-mail"
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
              placeholder="•••••"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              style={styles.input}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Ainda não possui uma conta?{' '}
            </Text>
            <Text 
              style={styles.registerLink}
              onPress={() => navigation.navigate("Register")}
            >
              CADASTRE-SE
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B140',
    textAlign: 'center',
    marginBottom: 30,
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
    marginBottom: 20,
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#333',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00B140',
  },
});