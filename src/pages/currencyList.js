import React, { useRef, useState, useEffect } from 'react';
import styles from './currencyList.module.css';
import Panel from '../components/panel';
import CurrencyBox from '../components/currencyBox';

export default function CurrencyList() {
  const [currencyData, setCurrencyData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const baseRef = useRef(0);
  const targetRef = useRef(0);

  const calculateInput = () => {
    if (targetRef.current.value.trim() === "") {
      baseRef.current.value = 0;
      return;
    }

    if (targetRef.current.value >= 0) baseRef.current.value = parseFloat((parseFloat(targetRef.current.value) * parseFloat(selectedCurrency.deal_bas_r.replace(/,/g, ""))).toFixed(5));
    else baseRef.current.value = 0;
  }

  const calculateOutput = () => {
    if (baseRef.current.value.trim() === "") {
      targetRef.current.value = 0;
      return;
    }

    if (baseRef.current.value >= 0) targetRef.current.value = parseFloat((parseFloat(baseRef.current.value) / parseFloat(selectedCurrency.deal_bas_r.replace(/,/g, ""))).toFixed(5));
    else targetRef.current.value = 0;
  }

  const getData = async () => {
    // const mock_API = 'https://67283275270bd0b97554a345.mockapi.io/currency';
    const currency_API = '/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&data=AP01';
  
    try {
      const response = await fetch(currency_API);
      const data = await response.json();
      setCurrencyData(data);
      setSelectedCurrency(data[0]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }

  const setTarget = (data) => {
    calculateOutput();
    setSelectedCurrency(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.page_container}>
      <Panel selected={selectedCurrency} getData={getData} baseRef={baseRef} targetRef={targetRef} calculateInput={calculateInput} calculateOutput={calculateOutput} />
      <CurrencyBox data={currencyData} setTarget={setTarget} />
    </div>
  );
}
