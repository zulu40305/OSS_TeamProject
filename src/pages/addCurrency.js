import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './addCurrency.module.css';

export default function AddCurrency() {
  const [curNameValidity, setCurNameValidity] = useState(true);
  const [curUnitValidity, setCurUnitValidity] = useState(true);
  const [ttbValidity, setTtbValidity] = useState(true);
  const [ttsValidity, setTtsValidity] = useState(true);
  const [dbrValidity, setDbrValidity] = useState(true);
  const [bkprValidity, setBkprValidity] = useState(true);
  const [kdbrValidity, setKdbrValidity] = useState(true);
  const [kbkprValidity, setKbkprValidity] = useState(true);
  const [rocValidity, setRocValidity] = useState(true);

  const curNameRef = useRef("");
  const curUnitRef = useRef("");
  const ttbRef = useRef("");
  const ttsRef = useRef("");
  const dbrRef = useRef("");
  const bkprRef = useRef("");
  const kdbrRef = useRef("");
  const kbkprRef = useRef("");
  const rocRef = useRef("");

  const onChangeCurName = (value) => {
    if (value.trim() === "") {
      setCurNameValidity(false);
      return false;
    }
    else {
      setCurNameValidity(true);
      return true;
    }
  };

  const onChangeCurUnit = (value) => {
    if (value.trim() === "") {
      setCurUnitValidity(false);
      return false;
    }
    else {
      setCurUnitValidity(true);
      return true;
    }
  };

  const onChangeTTB = (value) => {
    if (value.trim() === "" || isNaN(value)) {
      setTtbValidity(false);
      return false;
    }
    else {
      setTtbValidity(true);
      return true;
    }
  };

  const onChangeTTS = (value) => {
    if (value.trim() === "" || isNaN(value)) {
      setTtsValidity(false);
      return false;
    }
    else {
      setTtsValidity(true);
      return true;
    }
  };

  const onChangeDBR = (value) => {
    if (value.trim() === "" || isNaN(value)) {
      setDbrValidity(false);
      return false;
    }
    else {
      setDbrValidity(true);
      return true;
    }
  };

  const onChangeBKPR = (value) => {
    if (value.trim() === "" || isNaN(value)) {
      setBkprValidity(false);
      return false;
    }
    else {
      setBkprValidity(true);
      return true;
    }
  };

  const onChangeKDBR = (value) => {
    if (value.trim() === "" || isNaN(value)) {
      setKdbrValidity(false);
      return false;
    }
    else {
      setKdbrValidity(true);
      return true;
    }
  };

  const onChangeKBKPR = (value) => {
    if (value.trim() === "" || isNaN(value)) {
      setKbkprValidity(false);
      return false;
    }
    else {
      setKbkprValidity(true);
      return true;
    }
  };

  const onChangeROC = (value) => {
    if (value.trim() === "" || isNaN(value)) {
      setRocValidity(false);
      return false;
    }
    else {
      setRocValidity(true);
      return true;
    }
  };

  const dataInsertionRequest = async () => {
    if (
      onChangeCurName(curNameRef.current.value) && 
      onChangeCurUnit(curUnitRef.current.value) && 
      onChangeTTB(ttbRef.current.value) && 
      onChangeTTS(ttsRef.current.value) && 
      onChangeDBR(dbrRef.current.value) && 
      onChangeBKPR(bkprRef.current.value) && 
      onChangeKDBR(kdbrRef.current.value) && 
      onChangeKBKPR(kbkprRef.current.value) && 
      onChangeROC(rocRef.current.value)
    ) {
      const data = {
        result: 1,
        cur_nm: curNameRef.current.value,
        cur_unit: curUnitRef.current.value,
        ttb: ttbRef.current.value,
        tts: ttsRef.current.value,
        deal_bas_r: dbrRef.current.value,
        bkpr: bkprRef.current.value,
        kftc_deal_bas_r: kdbrRef.current.value,
        kftc_bkpr: kbkprRef.current.value,
        rate_of_change: rocRef.current.value.toFixed(2)
      }

      await addDataToMockAPI(data);
      alert("Successfully Added the Data");

      curNameRef.current.value = "";
      curUnitRef.current.value = "";
      ttbRef.current.value = "";
      ttsRef.current.value = "";
      dbrRef.current.value = "";
      bkprRef.current.value = "";
      kdbrRef.current.value = "";
      kbkprRef.current.value = "";
      rocRef.current.value = "";
    } else {
      alert("Please enter correct values ​​in all fields");
    }
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

  const addDataToMockAPI = async (data) => {
    let dataFromStorage = await getDataFromMockAPI();

    const new_data = {
      id: dataFromStorage[dataFromStorage.length - 1].id + 1,
      result: 1,
      cur_nm: data.cur_nm,
      cur_unit: data.cur_unit,
      ttb: data.ttb,
      tts: data.tts,
      deal_bas_r: data.deal_bas_r,
      bkpr: data.bkpr,
      kftc_deal_bas_r: data.kftc_deal_bas_r,
      kftc_bkpr: data.kftc_bkpr,
      rate_of_change: data.rate_of_change
    };

    dataFromStorage.push(new_data);

    await saveDataToMockAPI(dataFromStorage);
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.input_element_container}>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="currency_name">Currency Name</label>
          <input className={curNameValidity ? styles.input : styles.warning_input} ref={curNameRef} type="text" name="currency_name" placeholder="ex) 미국 달러" onChange={(e) => onChangeCurName(e.target.value)} />
          <p className={curNameValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="currency_unit">Currency Unit</label>
          <input className={curUnitValidity ? styles.input : styles.warning_input} ref={curUnitRef} type="text" name="currency_unit" placeholder="ex) USD" onChange={(e) => onChangeCurUnit(e.target.value)} />
          <p className={curUnitValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="ttb">TTB&nbsp; - &nbsp;
            <span className={styles.description}>Telegraphic Transfer Buying</span>
          </label>
          <input className={ttbValidity ? styles.input : styles.warning_input} ref={ttbRef} type="text" name="ttb" placeholder="TTB" onChange={(e) => onChangeTTB(e.target.value)} />
          <p className={ttbValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="tts">TTS&nbsp; - &nbsp;
            <span className={styles.description}>Telegraphic Transfer Selling</span>
          </label>
          <input className={ttsValidity ? styles.input : styles.warning_input} ref={ttsRef} type="text" name="tts" placeholder="TTS" onChange={(e) => onChangeTTS(e.target.value)} />
          <p className={ttsValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="deal_basis_r">Deal Basis Rate</label>
          <input className={dbrValidity ? styles.input : styles.warning_input} ref={dbrRef} type="text" name="deal_basis_r" placeholder="Deal Basis Rate" onChange={(e) => onChangeDBR(e.target.value)} />
          <p className={dbrValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="bkpr">Bookkeeping Price</label>
          <input className={bkprValidity ? styles.input : styles.warning_input} ref={bkprRef} type="text" name="bkpr" placeholder="Bookkeeping Price" onChange={(e) => onChangeBKPR(e.target.value)} />
          <p className={bkprValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="kftc_deal_basis_r">KFTC Deal Basis Rate</label>
          <input className={kdbrValidity ? styles.input : styles.warning_input} ref={kdbrRef} type="text" name="kftc_deal_basis_r" placeholder="KFTC Deal Basis Rate" onChange={(e) => onChangeKDBR(e.target.value)} />
          <p className={kdbrValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="kftc_bkpr">KFTC Bookkeeping Price</label>
          <input className={kbkprValidity ? styles.input : styles.warning_input} ref={kbkprRef} type="text" name="kftc_bkpr" placeholder="KFTC Bookkeeping Price" onChange={(e) => onChangeKBKPR(e.target.value)} />
          <p className={kbkprValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="rate_of_change">Rate of Change&nbsp; - &nbsp;
            <span className={styles.description}>Compared to the previous day</span>
          </label>
          <input className={rocValidity ? styles.input : styles.warning_input} ref={rocRef} type="text" name="rate_of_change" placeholder="0.00%" onChange={(e) => onChangeROC(e.target.value)} />
          <p className={rocValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
      </div>

      <div className={styles.btn_container}>
        <button className={`${styles.btn} ${styles.btn_save}`} onClick={dataInsertionRequest}>Save Currency</button>
        <Link to="/"><button className={`${styles.btn} ${styles.btn_cancel}`}>Cancel</button></Link>
      </div>
    </div>
  );
}
