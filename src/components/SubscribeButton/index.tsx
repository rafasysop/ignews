import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data } = useSession();

  const handleSubscribe = async () => {
    if (!data) {
      return signIn("github");
    }
    try {
      const { sessionId } = (await api.post("/subscribe")).data;
      const stripe = await getStripeJs();
      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error("erro", err);
    }
  };

  return (
    <button
      onClick={() => handleSubscribe()}
      className={styles.subscribeButton}
    >
      Subscribe Now
    </button>
  );
}
