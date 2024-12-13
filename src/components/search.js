import styles from './search.module.css';

export default function Search(props) {

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input className={styles.currency_name_input} onChange={props.applyFilter} ref={props.searchRef} type="text" name="currency_name" placeholder='Enter the currency name or unit' />
        <button className={styles.search_btn} onClick={props.applyFilter}>Search</button>
      </div>
      
      <select className={styles.select} onChange={(e) => props.setOption(e.target.value)} disabled={props.data.length === 0 || props.data[0].result === 4}>
        <option value="all">All</option>
        <option value="increasing">Increasing</option>
        <option value="decreasing">Decreasing</option>
      </select>
    </div>
  );
}