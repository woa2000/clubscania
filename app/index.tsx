import { Redirect } from "expo-router";
import { useAuth } from "../contexts/auth";

export default function Index() {
  const { signed, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (signed) {
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
