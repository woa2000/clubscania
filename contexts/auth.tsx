import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { signInService } from '../services/auth';

// Interfaces
interface User {
  id: string;
  nome: string;
  email: string;
  // Adicione outros campos se necessário, conforme a resposta da API
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<string | null>; // Retorna uma mensagem de erro ou nulo
  signOut(): void;
}

// Chaves do AsyncStorage
const STORAGE_KEYS = {
  user: '@ScaniaClube:user',
  token: '@ScaniaClube:token',
};

// Contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega dados do AsyncStorage ao iniciar o app
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storagedUser = await AsyncStorage.getItem(STORAGE_KEYS.user);
        const storagedToken = await AsyncStorage.getItem(STORAGE_KEYS.token);

        if (storagedUser && storagedToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(storagedToken)}`;
          setUser(JSON.parse(storagedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
        // Tratar o erro, talvez limpando o storage
        await AsyncStorage.clear();
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  // Função de Login
  async function signIn(email: string, password: string): Promise<string | null> {
    const response = await signInService(email, password);

    if (response.error) {
      return response.error; // Retorna a mensagem de erro da API
    }

    if (response.token && response.user) {
      setUser(response.user);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

      try {
        await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(response.user));
        await AsyncStorage.setItem(STORAGE_KEYS.token, JSON.stringify(response.token));
      } catch (error) {
        console.error("Erro ao salvar no AsyncStorage:", error);
        return "Erro ao salvar a sessão. Tente novamente.";
      }
      
      return null; // Login bem-sucedido
    }

    return "Resposta inesperada do servidor."; // Fallback
  }

  // Função de Logout
  async function signOut() {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.user, STORAGE_KEYS.token]);
    } catch (error) {
      console.error("Erro ao limpar o AsyncStorage:", error);
    }
    setUser(null);
    // Limpa o header de autorização
    delete api.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
