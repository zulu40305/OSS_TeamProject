import styles from './currencyElement.module.css';
import { ReactCountryFlag } from '@fadi-ui/react-country-flag';

export default function CurrencyElement(props) {

  return (
    <div key={props.data.cur_unit} className={styles.currency_element_container} onClick={() => props.setTarget(props.data)}>
      <div className={styles.flag_container}>
        {
          props.iso_code === "EU" ? 
          <>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/225px-Flag_of_Europe.svg.png" 
              style={{width: "30px", height: "23px"}} 
            />
            {`${props.data.cur_nm}(${props.data.cur_unit})`}
          </>
          :
          <>
            <ReactCountryFlag countryCode={props.iso_code} svg width={30} height={23} />
            {`${props.data.cur_nm}(${props.data.cur_unit})`}
          </>
        }
      </div>
      <div className={styles.information_container}>
        <div className={styles.data_ttb}>{`매입률(TTB): ${props.data.ttb}원`}</div>
        <div className={styles.data_tts}>{`매도율(TTS): ${props.data.tts}원`}</div>
        <div className={styles.data_deal_bas_r}>{`매매기준율(Deal_Bas_R): ${props.data.deal_bas_r}원`}</div>
        <div className={styles.data_bkpr}>{`장부가(bkpr): ${props.data.bkpr}원`}</div>
      </div>
    </div>
  );
}