
import api from './api';

// Interfaces baseadas na resposta da API descrita em docs/AUTENTICACAO.md
interface User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  celular: string;
  imgPerfil: string;
  idioma: string;
}

interface JWT {
  token: string | null;
  user: User | null;
  fileServer: string | null;
  error: string | null;
}

export function signInService(userName: string, password: string): Promise<JWT> {
  const data = { 
    userName: userName,
    password: password
  };
  
  return new Promise(resolve => {
    api.post("auth/login", data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      const data = response.data as JWT;
      
      resolve({
        token: data.token,
        user: data.user,
        fileServer: data.fileServer,
        error: null
      });
    })
    .catch((err) => {
      resolve({
        token: null,
        user: null,
        fileServer: null,
        error: err.response?.data?.error || "Erro de comunicação com o servidor."
      });
    });
  });
}
