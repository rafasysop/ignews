import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLoggedIn = true;
  return isUserLoggedIn ? (
    <button className={styles.signIn}>
      <FaGithub color="#04d361" /> Rafael Moura
      <FiX color="#737380" />
    </button>
  ) : (
    <button className={styles.signIn}>
      <FaGithub color="#eba417" /> Sign in with Github
    </button>
  );
}
