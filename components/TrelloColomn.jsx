import { useState } from 'react';
import styles from './trello.module.css';
import TrelloFinishedColomn from './TrelloFinishedColomn';
import TrelloInitColomn from './TrelloInitColomn';

export default function TrelloColomn({ index, idcko, isNextColomn=false, initText= "Přidej další sloupec", functionsWrapper, isDraggedUnder }) {
  const [isColomn, setIsColomn] = useState(isNextColomn);
  const [isFinishedColomn, setFinishedIsColomn] = useState(false);

  const [topic, setTopic] = useState('');
  
  function transferToColomn() {
    //new Audio('/blbl.mp3').play();
    setIsColomn(true);
  }

  return (
    <>
      {isColomn ? (
        isFinishedColomn ? (
          <TrelloFinishedColomn functionsWrapper={functionsWrapper} isDraggedUnder={isDraggedUnder} topic={topic} setTopic={setTopic} index={index} idcko={idcko} setIsColomn={setIsColomn} setFinishedIsColomn={setFinishedIsColomn}/>
        ) : (
          <TrelloInitColomn functionsWrapper={functionsWrapper} initText={initText} setIsColomn={setIsColomn} setTopic={setTopic} setFinishedIsColomn={setFinishedIsColomn}  />
        )
      ) : (
        <button className={styles.trelloButton} onClick={transferToColomn}>
          <b>+</b> {initText}
        </button>
      )}
    </>
  );
}
