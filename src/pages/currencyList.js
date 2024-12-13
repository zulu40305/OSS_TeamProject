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
    if (targetRef.current.value === "") {
      baseRef.current.value = 0;
      return;
    }

    if (targetRef.current.value >= 0) baseRef.current.value = parseFloat((parseFloat(targetRef.current.value) * parseFloat(selectedCurrency.deal_bas_r.replace(/,/g, ""))).toFixed(5));
    else baseRef.current.value = 0;
  }

  const calculateOutput = () => {
    if (baseRef.current.value === "") {
      targetRef.current.value = 0;
      return;
    }

    if (baseRef.current.value >= 0) targetRef.current.value = parseFloat((parseFloat(baseRef.current.value) / parseFloat(selectedCurrency.deal_bas_r.replace(/,/g, ""))).toFixed(5));
    else targetRef.current.value = 0;
  }

  const saveDataToMockAPI = async (data) => {
    const mock_API = 'https://67283275270bd0b97554a345.mockapi.io/currency';

    const refined_data = { data: data };
  
    try {
      await fetch(`${mock_API}/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(refined_data),
      });
    } catch (error) {
      console.error("An error occurred while adding a data.", error);
      throw error;
    }
  };

  const getDataFromMockAPI = async () => {
    const mock_API = 'https://67283275270bd0b97554a345.mockapi.io/currency';

    try {
      const response = await fetch(mock_API);
      const data = await response.json();
      return data[0].data;
    } catch (error) {
      console.error("An error occurred while loading data.", error);
      throw error;
    }
  }

  const getDataFromOpenAPI = async () => {
    const dateInfo = getDate();
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const API_today = `${PROXY}/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&searchdate=${dateInfo.today}&data=AP01`;
    const API_yesterday = `${PROXY}/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&searchdate=${dateInfo.yesterday}&data=AP01`;
    const API_dayBeforeYesterday = `${PROXY}/exchangeJSON?authkey=3wNf5tfXGjytedr8fF3AUEljbd30YBED&searchdate=${dateInfo.beforeYesterday}&data=AP01`;
    let dataArray = await getDataFromMockAPI();
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

        let data = {
          id: i,
          ...e,
          rate_of_change: (((todayValue - yesterdayValue) / yesterdayValue) * 100).toFixed(2)
        }

        delete data.yy_efee_r;
        delete data.ten_dd_efee_r;

        return data;
      });

      modifiedData.map((e) => {
        if (!dataArray.find(i => i.id === e.id)) return dataArray.push(e);
        else return e;
      });

      dataArray.map((e) => {
        const coveredData = modifiedData.find(i => i.id === e.id);
        if (coveredData) return e = coveredData;
        else return e;
      });

      dataArray = dataArray.sort((a, b) => a.cur_unit.localeCompare(b.cur_unit));

      await saveDataToMockAPI(dataArray);
      const savedData = await getDataFromMockAPI();

      setCurrencyData(savedData);
      setFilteredData(savedData);
      setSelectedCurrency(savedData[0]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDataFromMockAPI();
        setCurrencyData(data);
        setFilteredData(data);
        setSelectedCurrency(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    getData();
  }, []);

  return (
    <div className={styles.page_container}>
      <div className={styles.page_section_panel}>
        <Panel 
          selected={selectedCurrency} 
          getData={getDataFromOpenAPI} 
          baseRef={baseRef} 
          targetRef={targetRef} 
          targetData={selectedCurrency}
          calculateInput={calculateInput} 
          calculateOutput={calculateOutput} 
        />
      </div>
      <div className={styles.page_section_currency}>
        <Search searchRef={searchRef} applyFilter={applyFilter} setOption={setOption} data={filteredData} />
        <CurrencyBox data={filteredData} setTarget={setTarget} />
      </div>
    </div>
  );
}
