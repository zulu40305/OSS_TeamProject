import { Link } from 'react-router-dom';
import logo from '../image/logo512.png';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/">
        <img className={styles.icon} src={logo} alt=""/>
        <h3 className={styles.header_label}>KRW Converter</h3>
      </Link>
    </header>
  );
}