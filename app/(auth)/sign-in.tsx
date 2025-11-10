import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../contexts/auth';
import {
  ButtonEntrar,
  ButtonEntrarText,
  ButtonRegistrar,
  ButtonRegistrarText,
  Container,
  ForgotPasswordButton,
  ForgotPasswordText,
  FormContainer,
  Input,
  InputContainer,
  InputLabel,
  Logo,
  LogoContainer,
  PasswordContainer,
  PasswordInput,
  PasswordToggle,
  PasswordToggleText
} from './styles';

export default function SignIn() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignIn() {
    if (!cpf || !password) {
      Alert.alert("Erro", "Por favor, preencha CPF e senha.");
      return;
    }

    setLoading(true);
    const error = await signIn(cpf, password);
    setLoading(false);

    if (error) {
      Alert.alert("Erro de Login", error);
    }
  }

  function handleRegister() {
    router.push('/(auth)/sign-up');
  }

  function handleForgotPassword() {
    router.push('/(auth)/forgot-password');
  }

  return (
    <Container style={{ padding:20, paddingBottom:0}}>
      <LogoContainer>
        <Logo source={require('../../assets/images/icon.png')} resizeMode="contain" />
      </LogoContainer>

      <FormContainer>
        <InputContainer>
          <InputLabel>CPF</InputLabel>
          <Input
            placeholder="Somente números"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            autoCapitalize="none"
            editable={!loading}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel>Senha</InputLabel>
          <PasswordContainer>
            <PasswordInput
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <PasswordToggle onPress={() => setShowPassword(!showPassword)}>
              <PasswordToggleText>{showPassword ? '👁️' : '👁️‍🗨️'}</PasswordToggleText>
            </PasswordToggle>
          </PasswordContainer>
        </InputContainer>

        <ButtonEntrar onPress={handleSignIn} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <ButtonEntrarText>ENTRAR</ButtonEntrarText>
          )}
        </ButtonEntrar>

        <ButtonRegistrar onPress={handleRegister} disabled={loading}>
          <ButtonRegistrarText>REGISTRAR</ButtonRegistrarText>
        </ButtonRegistrar>

        <ForgotPasswordButton onPress={handleForgotPassword} disabled={loading}>
          <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
        </ForgotPasswordButton>
      </FormContainer>
    </Container>
  );
}
