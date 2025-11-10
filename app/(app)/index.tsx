import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../contexts/auth';

export default function Home() {
  const { signOut, user } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Bem-vindo ao App!</Text>
      <Text>{user?.nome}</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}
