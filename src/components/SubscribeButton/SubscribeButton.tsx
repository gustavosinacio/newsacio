import styles from "./SubscribeButton.module.scss";

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button type="button" className={styles.container}>
      Subscribe Now
    </button>
  );
}
