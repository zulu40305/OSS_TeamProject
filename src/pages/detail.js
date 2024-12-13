import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from './detail.module.css';

export default function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedData = location.state.data;

  const [curNameValidity, setCurNameValidity] = useState(true);
  const [curUnitValidity, setCurUnitValidity] = useState(true);
  const [ttbValidity, setTtbValidity] = useState(true);
  const [ttsValidity, setTtsValidity] = useState(true);
  const [dbrValidity, setDbrValidity] = useState(true);
  const [bkprValidity, setBkprValidity] = useState(true);
  const [kdbrValidity, setKdbrValidity] = useState(true);
  const [kbkprValidity, setKbkprValidity] = useState(true);
  const [rocValidity, setRocValidity] = useState(true);

  const curNameRef = useRef(selectedData.cur_nm || "");
  const curUnitRef = useRef(selectedData.cur_unit || "");
  const ttbRef = useRef(selectedData.ttb || 0);
  const ttsRef = useRef(selectedData.tts || 0);
  const dbrRef = useRef(selectedData.deal_bas_r || 0);
  const bkprRef = useRef(selectedData.bkpr || 0);
  const kdbrRef = useRef(selectedData.kftc_deal_bas_r || 0);
  const kbkprRef = useRef(selectedData.kftc_bkpr || 0);
  const rocRef = useRef(selectedData.rate_of_change || 0.00);

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

  const deleteDataFromMockAPI = async (id) => {
    let dataFromStorage = await getDataFromMockAPI();

    await saveDataToMockAPI(dataFromStorage.filter((data) => data.id !== id));
    alert("Successfully removed the corresponding data");
    navigate("/");
  }

  const modifyDataInMockAPI = async () => {
    let dataFromStorage = await getDataFromMockAPI();

    const targetData = dataFromStorage.find((d) => d.id === selectedData.id);
    console.log(targetData);

    if (
      targetData &&
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
      targetData.cur_nm = curNameRef.current.value;
      targetData.cur_unit = curUnitRef.current.value;
      targetData.ttb = ttbRef.current.value;
      targetData.tts = ttsRef.current.value;  
      targetData.deal_bas_r = dbrRef.current.value;
      targetData.bkpr = bkprRef.current.value;
      targetData.kftc_deal_bas_r = kdbrRef.current.value;
      targetData.kftc_bkpr = kbkprRef.current.value;
      targetData.rate_of_change = rocRef.current.value;

      await saveDataToMockAPI(dataFromStorage);
      alert("Successfully Added the Data");
      navigate("/");
    } else {
      alert("Please enter correct values ​​in all fields");
    }
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.input_element_container}>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="currency_name">Currency Name</label>
          <input className={curNameValidity ? styles.input : styles.warning_input} ref={curNameRef} defaultValue={selectedData.cur_nm} type="text" name="currency_name" placeholder="ex) 미국 달러" onChange={(e) => onChangeCurName(e.target.value)} />
          <p className={curNameValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="currency_unit">Currency Unit</label>
          <input className={curUnitValidity ? styles.input : styles.warning_input} ref={curUnitRef} defaultValue={selectedData.cur_unit} type="text" name="currency_unit" placeholder="ex) USD" onChange={(e) => onChangeCurUnit(e.target.value)} />
          <p className={curUnitValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="ttb">TTB&nbsp; - &nbsp;
            <span className={styles.description}>Telegraphic Transfer Buying</span>
          </label>
          <input className={ttbValidity ? styles.input : styles.warning_input} ref={ttbRef} defaultValue={selectedData.ttb} type="text" name="ttb" placeholder="TTB" onChange={(e) => onChangeTTB(e.target.value)} />
          <p className={ttbValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="tts">TTS&nbsp; - &nbsp;
            <span className={styles.description}>Telegraphic Transfer Selling</span>
          </label>
          <input className={ttsValidity ? styles.input : styles.warning_input} ref={ttsRef} defaultValue={selectedData.tts} type="text" name="tts" placeholder="TTS" onChange={(e) => onChangeTTS(e.target.value)} />
          <p className={ttsValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="deal_basis_r">Deal Basis Rate</label>
          <input className={dbrValidity ? styles.input : styles.warning_input} ref={dbrRef} defaultValue={selectedData.deal_bas_r} type="text" name="deal_basis_r" placeholder="Deal Basis Rate" onChange={(e) => onChangeDBR(e.target.value)} />
          <p className={dbrValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="bkpr">Bookkeeping Price</label>
          <input className={bkprValidity ? styles.input : styles.warning_input} ref={bkprRef} defaultValue={selectedData.bkpr} type="text" name="bkpr" placeholder="Bookkeeping Price" onChange={(e) => onChangeBKPR(e.target.value)} />
          <p className={bkprValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="kftc_deal_basis_r">KFTC Deal Basis Rate</label>
          <input className={kdbrValidity ? styles.input : styles.warning_input} ref={kdbrRef} defaultValue={selectedData.kftc_deal_bas_r} type="text" name="kftc_deal_basis_r" placeholder="KFTC Deal Basis Rate" onChange={(e) => onChangeKDBR(e.target.value)} />
          <p className={kdbrValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="kftc_bkpr">KFTC Bookkeeping Price</label>
          <input className={kbkprValidity ? styles.input : styles.warning_input} ref={kbkprRef} defaultValue={selectedData.kftc_bkpr} type="text" name="kftc_bkpr" placeholder="KFTC Bookkeeping Price" onChange={(e) => onChangeKBKPR(e.target.value)} />
          <p className={kbkprValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
        <div className={styles.input_element}>
          <label className={styles.label} htmlFor="rate_of_change">Rate of Change&nbsp; - &nbsp;
            <span className={styles.description}>Compared to the previous day</span>
          </label>
          <input className={rocValidity ? styles.input : styles.warning_input} ref={rocRef} defaultValue={selectedData.rate_of_change} type="text" name="rate_of_change" placeholder="0.00%" onChange={(e) => onChangeROC(e.target.value)} />
          <p className={rocValidity ? styles.invisible : styles.warning}>Please enter the valid value</p>
        </div>
      </div>

      <div className={styles.btn_container}>
        <button className={`${styles.btn} ${styles.btn_save}`} onClick={ async () => await modifyDataInMockAPI()}>Save</button>
        <button className={`${styles.btn} ${styles.btn_delete}`} onClick={ async () => await deleteDataFromMockAPI(selectedData.id)}>Delete</button>
      </div>
    </div>
  );
}
