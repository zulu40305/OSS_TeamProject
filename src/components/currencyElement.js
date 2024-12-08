import styles from './currencyElement.module.css';
import Flag from 'react-flagkit';

export default function CurrencyElement(props) {

  return (
    <div key={props.data.cur_unit} className={styles.currency_element_container} onClick={() => props.setTarget(props.data)}>
      <div className={styles.flag_container}>
        {
          <>
            <Flag country={props.iso_code} size={25} />
            {`${props.data.cur_nm}(${props.data.cur_unit})`}
          </>
        }
      </div>
      <div className={styles.information_container}>
        <div className={`${styles.col} ${styles.col1}`}>
          <div className={styles.data_ttb}>{`TTB: ${props.data.ttb}`}</div>
          <div className={styles.data_tts}>{`TTS: ${props.data.tts}`}</div>
        </div>
        <div className={`${styles.col} ${styles.col2}`}>
          <div className={styles.data_deal_bas_r}>{`Deal_Bas_R: ${props.data.deal_bas_r}`}</div>
          <div className={styles.data_bkpr}>{`Bkpr: ${props.data.bkpr}`}</div>
        </div>
        <div className={`${styles.col} ${styles.col3}`}>
          <div className={styles.data_deal_bas_r}>{`KFTC_Deal_Bas_R: ${props.data.kftc_deal_bas_r}`}</div>
          <div className={styles.data_bkpr}>{`KFTC_Bkpr: ${props.data.kftc_bkpr}`}</div>
        </div>
        <div className={styles.rate_of_change_container}>
          <div className={`${styles.rate_of_change} ${styles.decrease}`}>+0.50%</div>
        </div>
      </div>
    </div>
  );
}