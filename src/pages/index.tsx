import Head from "next/head";
import { AiOutlineCode } from "react-icons/ai";

import { SubscribeButton } from "../components/SubscribeButton/SubscribeButton";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Newsacio</title>
      </Head>

      <main className={styles.container}>
        <section>
          <span>Welcome</span>
          <h1>
            <span className={styles.news}>News</span> about <br /> the{" "}
            <span className="react">React</span> world
          </h1>
          <p>
            Get access to all the publications <br />
            <span>
              for{" "}
              {Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(9.9)}{" "}
              a month
            </span>
          </p>
          <SubscribeButton />
        </section>

        <AiOutlineCode color="#61dafb" />
      </main>
    </>
  );
}
