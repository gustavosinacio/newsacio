import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1>Newsacio</h1>
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
      </div>
    </header>
  );
}
