import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./SignInButton.module.scss";

export function SignInButton() {
  const { data: session } = useSession();

  console.log(9821, session);

  return session ? (
    <button
      type="button"
      className={styles.container}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      <span>{session.user.name}</span>
      <FiX color="#737373" />
    </button>
  ) : (
    <button
      type="button"
      className={styles.container}
      onClick={() => signIn("github")}
    >
      <FaGithub color={"#fff"} />
      <span>Sign in with GitHub</span>
    </button>
  );
}
