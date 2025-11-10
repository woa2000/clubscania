import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {
  ButtonEntrar,
  ButtonEntrarText,
  ButtonVoltar,
  ButtonVoltarText,
  Container,
  FormContainer,
  Input,
  InputContainer,
  InputLabel
} from './styles';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword() {
    if (!email) {
      Alert.alert("Erro", "Por favor, preencha o e-mail.");
      return;
    }

    setLoading(true);
    
    // Simular chamada de API
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "E-mail Enviado", 
        "Se o e-mail estiver cadastrado, você receberá instruções para recuperar sua senha.",
        [
          {
            text: "OK",
            onPress: () => router.back()
          }
        ]
      );
    }, 1500);
  }

  function handleBack() {
    router.back();
  }

  return (
    <Container style={{ padding:20, paddingBottom:0}}>
      <FormContainer style={{ marginTop: 120 }}>
        <InputContainer>
          <InputLabel>E-mail</InputLabel>
          <Input
            placeholder="email@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </InputContainer>

        <ButtonEntrar onPress={handleForgotPassword} disabled={loading} style={{ marginTop: 30 }}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <ButtonEntrarText>ENVIAR</ButtonEntrarText>
          )}
        </ButtonEntrar>

        <ButtonVoltar onPress={handleBack} disabled={loading}>
          <ButtonVoltarText>VOLTAR</ButtonVoltarText>
        </ButtonVoltar>
      </FormContainer>
    </Container>
  );
}
