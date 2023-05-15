import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {

 const { funcSignOut  } = useContext(AuthContext);


  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          {/* <img src="/logo.svg" width={190} height={60}/> */}
          <Image
            src="/logo.svg"
            alt="Sujeito pizza logo"
            width={190}
            height={60}
          />
        </Link>
        <nav className={styles.menuNav}>
          <Link href="/category">
            <p>Categoria</p>
          </Link>
          <Link href="/product">
            <p>Cardapio</p>
          </Link>

          <button onClick={funcSignOut}>
            <FiLogOut color="#fff" size={30} />
          </button>
        </nav>
      </div>
    </header>
  );
}
