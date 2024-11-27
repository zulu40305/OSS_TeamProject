import styles from './leftPanel.module.css';
import Button from './button';

export default function LeftPanel(props) {
  return (
    <div className={styles.left_panel_container}>
      <Button width="80%" btn="confirm" click={props.getData}>환율 정보 추가</Button>
      <Button width="80%" btn="cancel" click={() => {}}>환율 정보 새로고침</Button>
    </div>
  );
}