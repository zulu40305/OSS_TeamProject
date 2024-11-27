import React, { useState, useEffect } from 'react';
import styles from './currencyList.module.css';
import LeftPanel from '../components/leftPanel';
import CurrencyBox from '../components/currencyBox';

export default function CurrencyList() {
  const [currencyData, setCurrencyData] = useState([]);

  const getData = async () => {
    const url = `/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&data=AP01`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCurrencyData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }

  useEffect(() => {
    
  });

  return (
    <div className={styles.page_container}>
      <LeftPanel getData={getData}/>
      <div className={styles.page_divider} />
      <CurrencyBox />
    </div>
  );
}