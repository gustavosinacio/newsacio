import { FaGithub } from "react-icons/fa";

import styles from "./SignInButton.module.scss";

export function SignInButton() {
  return (
    <button className={styles.container} type="button">
      <FaGithub />
      <span>SignInButton</span>
    </button>
  );
}
