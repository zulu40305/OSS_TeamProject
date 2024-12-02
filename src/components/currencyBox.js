import styles from './currencyBox.module.css';
import CurrencyElement from './currencyElement';

export default function CurrencyBox(props) {

  const parse_iso_code = (currency) => {
    return currency.substr(0, 2);
  }

  const getFormattedDate = () => {
    const today = new Date();
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const week = dayNames[today.getDay()];
  
    return `${date} ${monthNames[month-1]} ${year}, ${week}`;
  };

  return (
    <div className={styles.currency_box}>
      <div className={styles.currency_box_label}>
        <h4>Korea Standard Time (KST)</h4>
        <h4>{getFormattedDate()}</h4>
      </div>
      {
        props.data.length === 0 ?
        "Could not retrieve currency data due to maintenance on the API provider."
        :
        props.data[0].result === 4 ?
        "Could not retrieve currency data due to API request the limit."
        :
        props.data.map(currencyData => (
          <CurrencyElement key={currencyData.cur_unit} iso_code={parse_iso_code(currencyData.cur_unit)} data={currencyData} setTarget={props.setTarget} />
        ))
      }
    </div>
  );
}