import styles from './panel.module.css';
import CurrencyCalculator from './currencyCalculator';
import Button from './button';

export default function Panel(props) {
  
  return (
    <div className={styles.panel_container}>
      <div className={styles.currency_calculator_section}>
        <CurrencyCalculator selected={props.selected} baseRef={props.baseRef} targetRef={props.targetRef} calculateInput={props.calculateInput} calculateOutput={props.calculateOutput} />
      </div>
      <div className={styles.button_section}>
        <Button width="80%" btn="confirm" click={props.getData}>Add Currency</Button>
        <Button width="80%" btn="cancel" click={props.fetchData}>Refresh Data</Button>
      </div>
    </div>
  );
}