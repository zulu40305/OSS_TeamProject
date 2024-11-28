import styles from './button.module.css';

export default function Button(props) {
  return (
    <button className={`${styles.button} ${props.btn === "confirm" ? styles.confirm : styles.cancel}`} style={{width: props.width}} onClick={props.click}>{props.children}</button>
  );
}