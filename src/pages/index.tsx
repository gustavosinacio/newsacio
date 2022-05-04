import { GetStaticProps } from "next";
import Head from "next/head";
import { AiOutlineCode } from "react-icons/ai";

import { SubscribeButton } from "../components/SubscribeButton/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "../styles/home.module.scss";

export default function Home({ product }: HomeProps) {
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
              }).format(product.value / 100)}{" "}
              a month
            </span>
          </p>
          <SubscribeButton priceId={product.id} />
        </section>

        <AiOutlineCode color="#61dafb" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(
    process.env.SUBSCRIPTION_PRODUCT_KEY,
    {
      expand: ["product"],
    }
  );

  return {
    props: {
      product: { id: price.id, value: price.unit_amount },
    },
    revalidate: 60,
  };
};
