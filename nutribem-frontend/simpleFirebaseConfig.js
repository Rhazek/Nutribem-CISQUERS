// Esta é uma versão simplificada do arquivo de configuração do Firebase
// que funciona tanto para web quanto para mobile sem dependências complexas

// Mock de funcionalidade do Firebase quando não está disponível ou apresenta erros
const firebaseMock = {
  firestore: () => ({
    collection: (path) => ({
      doc: (id) => ({
        collection: (subPath) => ({
          doc: (subId) => ({
            get: async () => ({
              exists: true,
              data: () => ({
                availableTimes: [
                  { time: '08:00', booked: false },
                  { time: '09:00', booked: false },
                  { time: '10:00', booked: false },
                  { time: '14:00', booked: false },
                  { time: '15:00', booked: false },
                  { time: '16:00', booked: false },
                ]
              })
            }),
            set: async () => {},
            update: async () => {}
          })
        }),
        get: async () => ({
          exists: true,
          data: () => ({
            name: 'Dr. Exemplo',
            defaultSchedule: [
              {
                day: 'monday',
                times: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
              },
              {
                day: 'tuesday',
                times: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
              },
              {
                day: 'wednesday',
                times: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
              },
              {
                day: 'thursday',
                times: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
              },
              {
                day: 'friday',
                times: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
              }
            ]
          })
        }),
        set: async () => {},
        update: async () => {}
      })
    }),
    runTransaction: async (fn) => await fn({
      get: async () => ({
        exists: true,
        data: () => ({
          availableTimes: [
            { time: '08:00', booked: false },
            { time: '09:00', booked: false },
            { time: '10:00', booked: false },
            { time: '14:00', booked: false },
            { time: '15:00', booked: false },
            { time: '16:00', booked: false },
          ]
        })
      }),
      set: async () => {},
      update: async () => {}
    })
  }),
  auth: () => ({
    currentUser: {
      uid: 'mock-user-123'
    }
  }),
  FieldValue: {
    serverTimestamp: () => new Date()
  }
};

// Tenta usar Firebase real ou fallback para mock
let firebase;
try {
  // Tenta importar Firebase, se disponível
  firebase = require('firebase/app');
  if (!firebase.apps.length) {
    // Configure suas credenciais aqui
    const firebaseConfig = {
  apiKey: "AIzaSyBHmYTyjJUbbu39XE0puodx0uXLtRVZnhQ",
  authDomain: "nutribem-web.firebaseapp.com",
  projectId: "nutribem-web",
  storageBucket: "nutribem-web.firebasestorage.app",
  messagingSenderId: "588351291040",
  appId: "1:588351291040:web:1cfa380b89b4c650ac53c5"
};

    
    firebase.initializeApp(firebaseConfig);
  }
  // Tenta importar módulos específicos
  try { require('firebase/firestore'); } catch (e) { console.log('Firestore import failed'); }
  try { require('firebase/auth'); } catch (e) { console.log('Auth import failed'); }
  try { require('firebase/storage'); } catch (e) { console.log('Storage import failed'); }
} catch (error) {
  console.log('Firebase import failed, using mock:', error.message);
  firebase = firebaseMock;
}

export { firebase };
