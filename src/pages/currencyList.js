import React, { useRef, useState, useEffect } from 'react';
import styles from './currencyList.module.css';
import Panel from '../components/panel';
import Search from '../components/search';
import CurrencyBox from '../components/currencyBox';

export default function CurrencyList() {
  const [currencyData, setCurrencyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const baseRef = useRef(0);
  const targetRef = useRef(0);
  const searchRef = useRef("");

  const setTarget = (data) => {
    calculateOutput();
    setSelectedCurrency(data);
  }

  const setOption = (option) => {
    applyFilter(option);
  }

  const applyFilter = (option) => {
    const searchValue = searchRef.current.value.toLowerCase(); 
    let filtered = currencyData;

    if (option === "increasing") {
      filtered = filtered.filter((data) => parseFloat(data.rate_of_change) > 0);
    } else if (option === "decreasing") {
      filtered = filtered.filter((data) => parseFloat(data.rate_of_change) < 0);
    }
  
    if (searchValue) {
      filtered = filtered.filter((data) =>
        data.cur_nm.toLowerCase().includes(searchValue) ||
        data.cur_unit.toLowerCase().includes(searchValue)
      );
    }
  
    setFilteredData(filtered);
  }

  const getDate = () => {
    const now = new Date();

    const yearToday = now.getFullYear();
    const monthToday = String(now.getMonth() + 1).padStart(2, '0');
    const dayToday = String(now.getDate()).padStart(2, '0');
    const today = `${yearToday}${monthToday}${dayToday}`;

    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(now.getDate() - 1);
    const yearYesterday = yesterdayDate.getFullYear();
    const monthYesterday = String(yesterdayDate.getMonth() + 1).padStart(2, '0');
    const dayYesterday = String(yesterdayDate.getDate()).padStart(2, '0');
    const yesterday = `${yearYesterday}${monthYesterday}${dayYesterday}`;

    const dayBeforeYesterdayDate = new Date(now);
    dayBeforeYesterdayDate.setDate(now.getDate() - 2);
    const yearBeforeYesterday = dayBeforeYesterdayDate.getFullYear();
    const monthBeforeYesterday = String(dayBeforeYesterdayDate.getMonth() + 1).padStart(2, '0');
    const dayBeforeYesterday = String(dayBeforeYesterdayDate.getDate()).padStart(2, '0');
    const beforeYesterday = `${yearBeforeYesterday}${monthBeforeYesterday}${dayBeforeYesterday}`;

    return { today, yesterday, beforeYesterday };
  }

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

  // need to fix
  const addDataToMockAPI = async (data) => {
    getDataFromMockAPI();
    const mock_API = 'https://67283275270bd0b97554a345.mockapi.io/currency';
    const new_data = {
      id: data.id,
      result: 1,
      cur_nm: data.cur_nm,
      cur_unit: data.cur_unit,
      ttb: data.ttb,
      tts: data.tts,
      deal_bas_r: data.deal_bas_r,
      bkpr: data.bkpr,
      kftc_deal_bas_r: data.kftc_deal_bas_r,
      kftc_bkpr: data.kftc_bkpr
    };

    try {
      await fetch(mock_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_data),
      });
    } catch (error) {
      console.error("An error occurred while adding a data.", error);
      throw error;
    }
  }

  // need to fix
  const saveDataToMockAPI = async (data) => {
    const mock_API = 'https://67283275270bd0b97554a345.mockapi.io/currency';

    const refined_data = data.map((d, i) => {
      return {
        result: 1,
        id: i,
        cur_nm: d.cur_nm,
        cur_unit: d.cur_unit,
        ttb: d.ttb,
        tts: d.tts,
        deal_bas_r: d.deal_bas_r,
        bkpr: d.bkpr,
        kftc_deal_bas_r: d.kftc_deal_bas_r,
        kftc_bkpr: d.kftc_bkpr
      }
    })
  
    try {
      await fetch(mock_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("An error occurred while adding a data.", error);
      throw error;
    }
  };

  // need to fix
  const getDataFromMockAPI = async () => {
    const mock_API = 'https://67283275270bd0b97554a345.mockapi.io/currency';

    try {
      const response = await fetch(mock_API);
      const data = await response.json();
      return data[0].currency_array;
    } catch (error) {
      console.error("An error occurred while loading data.", error);
      throw error;
    }
  }

  const getDataFromOpenAPI = async () => {
    const API_today = `/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&searchdate=${dateInfo.today}&data=AP01`;
    const API_yesterday = `/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&searchdate=${dateInfo.yesterday}&data=AP01`;
    const API_dayBeforeYesterday = `/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&searchdate=${dateInfo.beforeYesterday}&data=AP01`;
    const dateInfo = getDate();
    let response, response2, data, data2;
  
    try {
      response = await fetch(API_today);
      data = await response.json();

      response2 = await fetch(API_yesterday);
      data2 = await response2.json();

      if (data.length === 0 || data[0].result === 4) {
        try {
          response = await fetch(API_yesterday);
          data = await response.json();

          response2 = await fetch(API_dayBeforeYesterday);
          data2 = await response2.json();
        } catch (error) {
          console.error('Error fetching exchange rate:', error);
          throw error;
        }
      }

      const modifiedData = data.map((e, i) => {
        let todayValue = parseFloat(e.deal_bas_r.replace(",",""));
        let yesterdayValue = parseFloat(data2[i].deal_bas_r.replace(",",""));

        return {
          ...e,
          rate_of_change: (((todayValue - yesterdayValue) / yesterdayValue) * 100).toFixed(2)
        }
      });

      // await saveDataToMockAPI(data);
      // const latest_data = await getDataFromMockAPI();

      setCurrencyData(modifiedData);
      setFilteredData(modifiedData);
      setSelectedCurrency(modifiedData[0]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }

  useEffect(() => {
    // getDataFromMockAPI();
  }, []);

  return (
    <div className={styles.page_container}>
      <div className={styles.page_section_panel}>
        <Panel 
          selected={selectedCurrency} 
          getData={getDataFromOpenAPI} 
          baseRef={baseRef} 
          targetRef={targetRef} 
          calculateInput={calculateInput} 
          calculateOutput={calculateOutput} 
        />
      </div>
      <div className={styles.page_section_currency}>
        <Search searchRef={searchRef} applyFilter={applyFilter} setOption={setOption} />
        <CurrencyBox data={filteredData} setTarget={setTarget} />
      </div>
    </div>
  );
}
