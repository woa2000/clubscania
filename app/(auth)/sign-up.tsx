import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    // Lógica de cadastro aqui
    Alert.alert('Cadastro', 'Funcionalidade ainda não implementada.');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Criar Conta</Text>
      
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10, borderRadius: 5 }}
      />

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
        title="Cadastrar"
        onPress={handleSignUp}
      />
    </View>
  );
}
