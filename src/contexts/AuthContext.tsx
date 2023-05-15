import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { toast } from "react-toastify";
import Router from "next/router";
import { api } from "../services/apiClient";

export type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  funcSigIn: (credentials: SignInProps) => Promise<void>;
  funcSignUP: (credentials: SignUpProps) => Promise<void>;
  funcSignOut: () => void;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
};

export type SignInProps = {
  email: string;
  password: string;
};

export type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export type AuthProviderProps = {
  children: ReactNode;
};

export function funcSignOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");

    Router.push("/");
  } catch (error) {
    console.log("Erro ao tentar deslogar", error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    //Tentar pegar algo no cookie
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, email } = response.data;

          setUser({
            id,
            name,
            email,
          });
        })
        .catch(() => {
          funcSignOut();
        });
    }
  }, []);

  async function funcSigIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      // console.log(response.data);

      const { id, name, token } = response.data;
  
      
      setUser({
        id,
        name,
        email
      });
      
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });


      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Autenticação realizada com sucesso!")

      //Redirecionar o user para /dashboard
      Router.push("/dashboard");
    } catch (err) {
      toast.error("Falha ao tentar autenticar, verifique seus dados de acesso.");
      console.log("ERRO AO ACESSAR ", err);
    }
  }

  async function funcSignUP({ email, name, password }: SignUpProps) {
    try {
      await api.post("/users", {
        name,
        password,
        email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        funcSignOut,
        funcSigIn,
        funcSignUP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
