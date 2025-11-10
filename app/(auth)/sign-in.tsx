import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    const error = await signIn(email, password);
    setLoading(false);

    if (error) {
      Alert.alert("Erro de Login", error);
    }
    // Se não houver erro, o AuthContext irá redirecionar automaticamente.
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{t('Bem-vindo')}</Text>
      
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10, borderRadius: 5 }}
      />

      <Button
        title={loading ? "Carregando..." : t('Entrar')}
        onPress={handleSignIn}
        disabled={loading}
      />
    </View>
  );
}
