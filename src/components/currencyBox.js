import styles from './currencyBox.module.css';
import CurrencyElement from './currencyElement';

export default function CurrencyBox(props) {
  return (
    <div className={styles.currency_box}>
      <CurrencyElement iso_code="US"/>
      <CurrencyElement iso_code="KR"/>
      <CurrencyElement iso_code="FR"/>
      <CurrencyElement iso_code="JP"/>
      <CurrencyElement iso_code="CN"/>
      <CurrencyElement iso_code="CA"/>
      <CurrencyElement iso_code="IT"/>
      <CurrencyElement iso_code="BE"/>
      <CurrencyElement iso_code="DE"/>
      <CurrencyElement iso_code="GE"/>
      <CurrencyElement iso_code="GR"/>
      <CurrencyElement iso_code="SE"/>
      {/* {
        currencyData.length == 0 ?
        "환율 데이터 API 사이트의 점검으로 인하여 데이터를 불러올 수 없습니다."
        :
        currencyData[0].result == 4 ?
        "API 요청 횟수 한도를 초과하여 데이터를 불러올 수 없습니다."
        :
        "불러오기 완료"
      } */}
    </div>
  );
}