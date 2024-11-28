import styles from './currencyBox.module.css';
import CurrencyElement from './currencyElement';

export default function CurrencyBox(props) {

  const parse_iso_code = (currency) => {
    return currency.substr(0, 2);
  }

  const getFormattedDate = () => {
    const today = new Date();
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const week = dayNames[today.getDay()];
  
    return `${year}년 ${month}월 ${date}일, ${week}`;
  };

  return (
    <div className={styles.currency_box}>
      <h4>Korea Standard Time (KST)</h4>
      <h4>{getFormattedDate()}</h4>
      {
        props.data.length === 0 ?
        "환율 데이터 API 사이트의 점검으로 인하여 데이터를 불러올 수 없습니다."
        :
        props.data[0].result === 4 ?
        "API 요청 횟수 한도를 초과하여 데이터를 불러올 수 없습니다."
        :
        props.data.map(currencyData => (
          <CurrencyElement key={currencyData.cur_unit} iso_code={parse_iso_code(currencyData.cur_unit)} data={currencyData} setTarget={props.setTarget} />
        ))
      }
    </div>
  );
}