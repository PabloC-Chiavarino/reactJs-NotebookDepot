import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseCredentials = {
  apiKey: 'AIzaSyBcvSW-hvmp2WvloJzUds22E5tvMbK6K_E',
  authDomain: 'notebook-depot.firebaseapp.com',
  projectId: 'notebook-depot',
  storageBucket: 'notebook-depot.appspot.com',
  messagingSenderId: '500940590769',
  appId: '1:500940590769:web:fc4f9bdc4db78268809c90',
  measurementId: 'G-46ZV3FKK7V'
}

const fbApp = initializeApp(firebaseCredentials)

const initFirebase = () => fbApp

const dataBase = getFirestore()
const auth = getAuth(fbApp)

const firebaseErrorMessages = {
  'auth/email-already-in-use': 'Este correo ya está registrado.',
  'auth/invalid-email': 'El correo electrónico ingresado no es válido.',
  'auth/weak-password': 'La contraseña es demasiado débil. Usá al menos 6 caracteres.',
  'auth/user-not-found': 'No existe ninguna cuenta con ese correo.',
  'auth/wrong-password': 'La contraseña ingresada es incorrecta.',
  'auth/too-many-requests': 'Demasiados intentos fallidos. Intentalo más tarde.',
  'auth/missing-email': 'Debés ingresar un correo electrónico.',
  'auth/internal-error': 'Ocurrió un error inesperado. Intentá nuevamente.',
  'auth/network-request-failed': 'Error de conexión. Verificá tu red e intentá de nuevo.',
  'auth/popup-closed-by-user': 'La ventana emergente fue cerrada antes de completar la operación.',
  'auth/requires-recent-login': 'Debés volver a iniciar sesión para hacer esta operación.'
}

export {
  initFirebase,
  dataBase,
  auth,
  firebaseErrorMessages
}
