import React, { useState, useEffect } from 'react';
import styles from './currencyList.module.css';
import Panel from '../components/panel';
import CurrencyBox from '../components/currencyBox';

export default function CurrencyList() {
  const [currencyData, setCurrencyData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const getData = async () => {
    const mock_API = 'https://67283275270bd0b97554a345.mockapi.io/currency';
    const currency_API = '/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&data=AP01';
  
    try {
      const response = await fetch(currency_API);
      const data = await response.json();
      setCurrencyData(data);
      console.log(data);
      setSelectedCurrency(data[0]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }

  const setTarget = (data) => setSelectedCurrency(data);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.page_container}>
      <Panel selected={selectedCurrency} getData={getData} />
      <CurrencyBox data={currencyData} setTarget={setTarget} />
    </div>
  );
}
