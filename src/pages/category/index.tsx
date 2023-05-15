import Head from "next/head";
import styles from "./styles.module.scss";
import Input, { TextArea } from "../../components/ui/Input";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito Pizza</title>
      </Head>

      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>
          <form className="">
                <Input placeholder="" type="text" />
          </form>
        </main>
      </div>
    </>
  );
}

// export const getServerSideProps = canSSRAuth(async(ctx) =>{
//     return{
//         props:{

//         }
//     }
// })
