import { useContext, FormEvent, useState } from "react";
import Router from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import Image from "next/image";
import styles from "../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { canSSRGuest } from "../utils/canSRRGuest";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { funcSigIn } = useContext(AuthContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (email == "" || password == "") {
      toast.warning("Favor preencher corretamente os dados do usuário!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };
    await funcSigIn(data);
    setLoading(false);

    Router.push({
      pathname: "/dashboard",
    });
  }

  return (
    <>
      <div>
        <title>SujeitoPizza - Faça seu login</title>
      </div>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>
          </form>
          <Link href="/signup" className={styles.text}>
            Não possui uma conta ? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
