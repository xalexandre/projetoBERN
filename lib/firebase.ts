import auth from '@react-native-firebase/auth';

// Configuração do Firebase (obtida do console do Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyBLiK95LaPrSAW-Dlm_3_TJ4tPd2eAhRpY",
    authDomain: "projetobern.firebaseapp.com",
    databaseURL: "https://projetobern-default-rtdb.firebaseio.com",
    projectId: "projetobern",
    storageBucket: "projetobern.firebasestorage.app",
    messagingSenderId: "740917405790",
    appId: "1:740917405790:web:8e240dcadcd0180cb5accf",
    measurementId: "G-PE3SBLJWVV"
};

// Funções de autenticação
export const firebaseAuth = {
  // Login com email/senha
  signIn: async (email: string, password: string) => {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      return {
        user: result.user,
        error: null
      };
    } catch (error: unknown) {
      const firebaseError = error as { message: string };
      return {
        user: null,
        error: firebaseError.message
      };
    }
  },

  // Logout
  signOut: async () => {
    try {
      await auth().signOut();
      return { error: null };
    } catch (error: unknown) {
      const firebaseError = error as { message: string };
      return { error: firebaseError.message };
    }
  },

  // Criar conta
  signUp: async (email: string, password: string) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      return {
        user: result.user,
        error: null
      };
    } catch (error: unknown) {
      const firebaseError = error as { message: string };
      return {
        user: null,
        error: firebaseError.message
      };
    }
  }
}; 