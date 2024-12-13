import styles from './panel.module.css';
import { Link } from 'react-router-dom';
import CurrencyCalculator from './currencyCalculator';
import Button from './button';

export default function Panel(props) {
  
  return (
    <div className={styles.panel_container}>
      <div className={styles.panel_content_container}>
        <div className={styles.currency_calculator_section}>
          <CurrencyCalculator selected={props.selected} baseRef={props.baseRef} targetRef={props.targetRef} calculateInput={props.calculateInput} calculateOutput={props.calculateOutput} />
        </div>
        <div className={styles.button_section}>
          <Link to="/add_currency"><Button width="80%" btn="confirm">Add Currency</Button></Link>
          <Button width="80%" btn="cancel" click={props.getData}>Refresh Data</Button>
        </div>
      </div>
      <Link to="/detail" state={{data: props.targetData}}><Button width="80%" btn="confirm">Show Detail</Button></Link>
    </div>
  );
}