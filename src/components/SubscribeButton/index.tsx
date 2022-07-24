import { GetStaticProps } from "next";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data } = useSession();

  const handleSubscribe = () => {
    if (!data) {
      return signIn("github");
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
