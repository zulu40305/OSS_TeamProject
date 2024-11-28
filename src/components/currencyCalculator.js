import React, { useRef } from 'react';
import styles from './currencyCalculator.module.css';

export default function CurrencyCalculator(props) {
  const inputRef = useRef(0);
  const outputRef = useRef(0);

  const calculateInput = () => {
    if (outputRef.current.value.trim() === "") {
      inputRef.current.value = 0;
      return;
    }

    if (outputRef.current.value >= 0) inputRef.current.value = (parseFloat(outputRef.current.value) * parseFloat(props.selected.deal_bas_r.replace(/,/g, ""))).toFixed(2);
    else inputRef.current.value = 0;
  }

  const calculateOutput = () => {
    if (inputRef.current.value.trim() === "") {
      outputRef.current.value = 0;
      return;
    }

    if (inputRef.current.value >= 0) outputRef.current.value = (parseFloat(inputRef.current.value) / parseFloat(props.selected.deal_bas_r.replace(/,/g, ""))).toFixed(2);
    else outputRef.current.value = 0;
  }

  return (
    <div className={styles.calculator_container}>
      <p className={styles.calculator_title}>환율 계산기</p>
      {
        props.selected ?
          <div className={styles.calculator}>
            <div className={styles.calculator_input_container}>
              <label htmlFor="currency_input">{`한국 원(KRW)`}</label>
              <input className={styles.calculator_input} type="text" defaultValue="0" name="currency_input" ref={inputRef} onChange={calculateOutput} />
            </div>
            <div className={styles.calculator_output_container}>
              <label htmlFor="currency_output">{`${props.selected.cur_nm}(${props.selected.cur_unit})`}</label>
              <input className={styles.calculator_output} type="text" defaultValue="0" name="currency_output" ref={outputRef} onChange={calculateInput} />
            </div>
          </div>
        :
        <h3>비교할 환율을 선택해주세요</h3>
      }
    </div>
  );
}