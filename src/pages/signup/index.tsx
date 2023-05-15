import { toast } from "react-toastify";
import { FormEvent, useState, useContext } from "react";
import Router from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import logoImg from "../../../public/logo.svg";
import styles from "../../styles/home.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  const { funcSignUP } = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.warning("Favor preecher corretamente os campos!");
      return;
    }

    setLoading(true);
    let data = {
      name,
      email,
      password,
    };

    await funcSignUP(data);

    setLoading(false);
    toast.success("Usuário criado com sucesso!");
    Router.push({ pathname: "/" });
  }

  return (
    <>
      <div>
        <title>Faça seu cadastro agora!</title>
      </div>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
          <Link href="/" className={styles.text}>
            Já possui uma conta ? Faça login!
          </Link>
        </div>
      </div>
    </>
  );
}
