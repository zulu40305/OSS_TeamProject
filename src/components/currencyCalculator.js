import React from 'react';
import styles from './currencyCalculator.module.css';
import { CircleFlag } from 'react-circle-flags'

export default function CurrencyCalculator(props) {

  const parse_iso_code = (currency) => {
    return currency.substr(0, 2).toLowerCase();
  }

  return (
    <div className={styles.calculator_container}>
      {
        props.selected ?
          <div className={styles.calculator}>
            <div className={styles.calculator_input_container}>
              <label className={styles.currency_label} htmlFor="currency_input">
                {`한국 원(KRW)`}
                <CircleFlag className={styles.country_flag} countryCode="kr" height="25" />
              </label>
              <input className={styles.calculator_input} type="text" defaultValue="0" name="currency_input" ref={props.baseRef} onChange={props.calculateOutput} />
            </div>
            <div className={styles.calculator_output_container}>
              <label className={styles.currency_label} htmlFor="currency_output">
                {`${props.selected.cur_nm}(${props.selected.cur_unit})`}
                <CircleFlag className={styles.country_flag} countryCode={parse_iso_code(props.selected.cur_unit)} height="25" />
              </label>
              <input className={styles.calculator_output} type="text" defaultValue="0" name="currency_output" ref={props.targetRef} onChange={props.calculateInput} />
            </div>
          </div>
        :
        <h3>Currency not selected</h3>
      }
    </div>
  );
}