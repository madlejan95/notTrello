import {useRef } from 'react';
import styles from './trello.module.css';

export default function TrelloInitColomn({initText, setIsColomn, setTopic, setFinishedIsColomn, functionsWrapper}) {

    const topicRef = useRef(null);

    function addColomn() {
        if (topicRef.current.value === '') {
          new Audio('/missingText.mp3').play();
          return;
        }
        new Audio('/addSloupec.mp3').play();
        setTopic(topicRef.current.value);
        setFinishedIsColomn(true);
        functionsWrapper.nextPls();
      }

    function handleEsc(event) {
        if (event.key === "Escape") {
          event.preventDefault();
          removeColomn();
        }
    }

    function removeColomn() {
        new Audio('/cancelSloupec.mp3').play();
        setIsColomn(false);
    }

    return (
        <>
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
                <img src="/images/icon-x.png" className={styles.xImage}/>
              </button>
            </form>
          </div>
        </>
    );    
}