import styles from './panel.module.css';
import CurrencyCalculator from './currencyCalculator';
import Button from './button';

export default function Panel(props) {
  return (
    <div className={styles.panel_container}>
      <div className={styles.currency_calculator_section}>
        <CurrencyCalculator/>
      </div>
      <div className={styles.button_section}>
        <Button width="80%" btn="confirm" click={props.getData}>환율 정보 추가</Button>
        <Button width="80%" btn="cancel" click={() => {}}>환율 정보 새로고침</Button>
      </div>
    </div>
  );
}