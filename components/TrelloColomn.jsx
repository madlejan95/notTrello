import { useState, useRef } from 'react';
import styles from './trello.module.css';

export default function TrelloColomn({ idcko, nextPls, deleteColumnPls, isNextColomn=false, initText= "Přidej další sloupec" }) {
  const [isColomn, setIsColomn] = useState(isNextColomn);
  const [isFinishedColomn, setFinishedIsColomn] = useState(false);
  const [topic, setTopic] = useState('');
  const topicRef = useRef(null);

  function transferToColomn() {
    //new Audio('/blbl.mp3').play();
    setIsColomn(true);
  }

  function addColomn() {
    if (topicRef.current.value === '') {
      //new Audio('/missingText.mp3').play();
      return;
    }
    //new Audio('/addSloupec.mp3').play();
    setTopic(topicRef.current.value);
    setFinishedIsColomn(true);
    nextPls();
  }

  function removeColomn() {
    //new Audio('/cancelSloupec.mp3').play();
    setIsColomn(false);
  }

  function removeCreatedColomn() {
    //new Audio('/cancelSloupecVyrobeny.mp3').play();
    setIsColomn(false);
    setFinishedIsColomn(false);
    setTopic('');
    deleteColumnPls(idcko);
  }

  function handleEsc(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      removeColomn();
    }
  }

  return (
    <>
      {isColomn ? (
        isFinishedColomn ? (
          //IS finished colom
          <div className={styles.TrelloColomn}>
            <input className={styles.TrelloColomnInputFinished} placeholder={topic}/>
            {/* <button>neco</button> */}
            <button
              className={styles.cancelButtonFinished}
              onClick={removeCreatedColomn}
            >X
            </button>
            <div class="break"/>
            <button>+Přidat kartu...</button>
          </div>
        ) : (
          //NOT finished colomn
          <div className={styles.TrelloColomn}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (event.key === "Enter") {
                  addColomn();
                }
              }}
            >
              <input
                autoFocus
                className={styles.TrelloColomnInput}
                type="text"
                placeholder={initText}
                ref={topicRef}
                onKeyDown={handleEsc}
              />
              <button
                className={styles.trelloButtonInsideAddColomn}
                onClick={addColomn}
              >
                Přidat sloupec
              </button>
              <button className={styles.cancelButton} onClick={removeColomn}>
                X
              </button>
            </form>
          </div>
        )
      ) : (
        <button className={styles.trelloButton} onClick={transferToColomn}>
          <b>+</b> {initText}
        </button>
      )}
    </>
  );
}
