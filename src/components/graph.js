import styles from './graph.module.css';
import { Link } from 'react-router-dom';
import Button from './button';

export default function Graph(props) {
  
  return (
    <div className={styles.page_container}>
      <div className={styles.graph_container}>
        <div className={styles.graph_type_button_section}>
          <Link to="/detail"><Button width="80%" btn="confirm">Show Detail</Button></Link>
          <Link to="/detail"><Button width="80%" btn="confirm">Show Detail</Button></Link>
          <Link to="/detail"><Button width="80%" btn="confirm">Show Detail</Button></Link>
        </div>
      </div>
      <Link to="/detail"><Button width="80%" btn="confirm">Show Detail</Button></Link>
    </div>
  );
}