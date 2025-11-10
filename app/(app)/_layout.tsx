import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../contexts/auth";

export default function AppLayout() {
  const { signed, loading } = useAuth();

  // Aguarda a verificação do status de autenticação
  if (loading) {
    // Pode retornar um componente de spinner aqui se desejar
    return null;
  }

  // Se o usuário não estiver logado, redireciona para a tela de login
  if (!signed) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Se o usuário estiver logado, renderiza as telas do app
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
