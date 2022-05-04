import { signIn, useSession } from "next-auth/react";

import { getStripeJs } from "../../services/stripeClient";
import styles from "./SubscribeButton.module.scss";

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const session = useSession();

  async function handleSubscribe() {
    if (session.status === "unauthenticated") {
      signIn("github");
      return;
    }

    try {
      const { sessionId }: SubscribeResponse = await (
        await fetch("/api/subscribe", { method: "POST" })
      ).json();

      const { redirectToCheckout } = await getStripeJs();
      await redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(9822, error);
      alert(error);
    }
  }

  return (
    <button
      type="button"
      className={styles.container}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}
