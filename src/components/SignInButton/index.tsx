import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton() {
  const { data } = useSession();
  const isUserLoggedIn = !!data?.user?.email;
  return isUserLoggedIn ? (
    <button onClick={() => signOut()} className={styles.signIn}>
      <FaGithub color="#04d361" /> {data?.user?.name}
      <FiX color="#737380" />
    </button>
  ) : (
    <button onClick={() => signIn("github")} className={styles.signIn}>
      <FaGithub color="#eba417" /> Sign in with Github
    </button>
  );
}
