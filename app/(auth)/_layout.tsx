import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../contexts/auth";

export default function AuthLayout() {
  const { signed, loading } = useAuth();

  // Aguarda a verificação do status de autenticação
  if (loading) {
    return null; // ou um componente de carregamento
  }

  // Se o usuário já estiver logado, redireciona para a home do app
  if (signed) {
    return <Redirect href="/(app)" />;
  }

  // Se não estiver logado, mostra as telas de autenticação
  return <Stack screenOptions={{ headerShown: false }} />;
}
