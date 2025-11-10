import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  function handleForgotPassword() {
    // Lógica de recuperação de senha aqui
    Alert.alert('Recuperação de Senha', 'Funcionalidade ainda não implementada.');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Recuperar Senha</Text>
      
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10, borderRadius: 5 }}
      />

      <Button
        title="Enviar"
        onPress={handleForgotPassword}
      />
    </View>
  );
}
