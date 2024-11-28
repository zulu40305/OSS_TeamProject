import styles from './currencyElement.module.css';
import { ReactCountryFlag } from '@fadi-ui/react-country-flag';

export default function CurrencyElement(props) {

  return (
    <div key={props.data.cur_unit} className={styles.currency_element_container}>
      <div className={styles.flag_container}>
        {
          props.iso_code === "EU" ? 
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/225px-Flag_of_Europe.svg.png" 
            style={{width: "30px", height: "23px"}} 
          />
          :
          <ReactCountryFlag countryCode={props.iso_code} svg width={30} height={23} />
        }
      </div>
      <div className={styles.information_container}>
        {`${props.data.cur_nm}(${props.data.cur_unit}) 매입률(TTB): ${props.data.ttb} 매도율(TTS): ${props.data.tts}`}
      </div>
    </div>
  );
}