import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {
  ButtonEntrar,
  ButtonEntrarText,
  ButtonVoltar,
  ButtonVoltarText,
  Checkbox,
  CheckboxContainer,
  CheckboxInner,
  CheckboxLink,
  CheckboxText,
  Container,
  FormContainer,
  Input,
  InputContainer,
  InputLabel,
  PasswordContainer,
  PasswordInput,
  PasswordToggle,
  PasswordToggleText,
  ScrollContainer
} from './styles';

export default function SignUp() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function formatDate(text: string) {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length >= 4) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
    }
    
    return formatted;
  }

  function handleSignUp() {
    if (!cpf || !birthDate || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!acceptedTerms) {
      Alert.alert("Erro", "Você deve aceitar os termos de uso e políticas de privacidade.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Lógica de cadastro aqui
    Alert.alert('Cadastro', 'Funcionalidade ainda não implementada.');
  }

  function handleBack() {
    router.back();
  }

  return (
    <Container style={{ padding:20, paddingBottom:0}}>
      <ScrollContainer>
        <FormContainer style={{ marginTop: 60 }}>
          <InputContainer>
            <InputLabel>CPF</InputLabel>
            <Input
              placeholder="Somente números"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              autoCapitalize="none"
              editable={!loading}
              maxLength={11}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>Data de Nascimento</InputLabel>
            <Input
              placeholder="DD/MM/AAAA"
              value={birthDate}
              onChangeText={(text) => setBirthDate(formatDate(text))}
              keyboardType="numeric"
              editable={!loading}
              maxLength={10}
            />
          </InputContainer>

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

          <InputContainer>
            <InputLabel>Senha</InputLabel>
            <PasswordContainer>
              <PasswordInput
                placeholder="*********"
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

          <InputContainer>
            <InputLabel>Confirmar Senha</InputLabel>
            <PasswordContainer>
              <PasswordInput
                placeholder="*********"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                editable={!loading}
              />
              <PasswordToggle onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <PasswordToggleText>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</PasswordToggleText>
              </PasswordToggle>
            </PasswordContainer>
          </InputContainer>

          <CheckboxContainer>
            <Checkbox onPress={() => setAcceptedTerms(!acceptedTerms)}>
              {acceptedTerms && <CheckboxInner />}
            </Checkbox>
            <CheckboxText>
              Eu li e aceito os <CheckboxLink>termos de uso e as políticas de privacidade.</CheckboxLink>
            </CheckboxText>
          </CheckboxContainer>

          <ButtonEntrar onPress={handleSignUp} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <ButtonEntrarText>REGISTRAR</ButtonEntrarText>
            )}
          </ButtonEntrar>

          <ButtonVoltar onPress={handleBack} disabled={loading}>
            <ButtonVoltarText>VOLTAR</ButtonVoltarText>
          </ButtonVoltar>
        </FormContainer>
      </ScrollContainer>
    </Container>
  );
}
