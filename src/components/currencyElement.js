import styles from './currencyElement.module.css';
import { ReactCountryFlag } from '@fadi-ui/react-country-flag';

export default function CurrencyElement(props) {
  return (
    <div className={styles.currency_element_container}>
      <div className={styles.flag_container}>
        <ReactCountryFlag countryCode={props.iso_code} width={30} height={22} />
      </div>
      <div className={styles.information_container}>
        {`${props.cur_nm}(${props.cur_unit}) 매입률(TTB): ${props.ttb} 매도율(TTS): ${props.tts}`}
      </div>
    </div>
  );
}