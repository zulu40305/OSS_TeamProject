import styles from './currencyCalculator.module.css';

export default function CurrencyCalculator(props) {
  return (
    <div className={styles.calculator_container}>
      <p className={styles.calculator_title}>환율 계산기</p>
      {
        props.selected ?
          <div className={styles.calculator}>
            <div className={styles.calculator_input_container}>
              <label htmlFor="currency_input">{`한국 원(KRW)`}</label>
              <input className={styles.calculator_input} type="text" name="currency_input" />
            </div>
            <div className={styles.calculator_output_container}>
              <label htmlFor="currency_output">{`${props.selected.cur_nm}(${props.selected.cur_unit})`}</label>
              <input className={styles.calculator_output} type="text" name="currency_output" />
            </div>
          </div>
        :
        <h3>비교할 환율을 선택해주세요</h3>
      }
    </div>
  );
}