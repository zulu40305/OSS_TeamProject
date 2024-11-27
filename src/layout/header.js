import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>환율 정보 시스템</h1>
    </header>
  );
}