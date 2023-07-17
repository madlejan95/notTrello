import styles from './trello.module.css';
import Head from 'next/head';
import TrelloColumn from '../components/TrelloColomn';
import { useState } from 'react';

export default function Trello() {
  const [trelloColumns, setTrelloColumns] = useState([{ key: getRandomId(), initText: "Přidat sloupec" }]);

  function getRandomId() {
    const min = 0;
    const max = 999999999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function moreGiveMeMoreGiveMeMore() {
    const newTrelloColumns = [...trelloColumns];
    newTrelloColumns.push({ key: getRandomId(), isNextColomn: true });
    setTrelloColumns(newTrelloColumns);
  }

  function deleteColumnPls(key) {
    let newTrelloColumns = [...trelloColumns];
    //newTrelloColumns.splice(newTrelloColumns.indexOf(key), 1);
    newTrelloColumns = newTrelloColumns.filter((item) => {
      return item.key !== key;
    });
    if (newTrelloColumns.length == 0) {
      newTrelloColumns.push({ key: getRandomId(), initText: "Přidat sloupec" });
    }
    if (newTrelloColumns.length == 1) {
      newTrelloColumns[0].initText = "Přidat sloupec";
    }
    setTrelloColumns(newTrelloColumns);
  }

  return (
    <>
      <Head>
        <link rel="icon" href="images/favicon.ico" />
      </Head>
      <div className={styles.topBar} >
        <h3>Nástěnka Totálně Ne Trello</h3>
      </div>
      <div className={styles.mainDivWrapper} id="style-2">
        {trelloColumns.map((trelloColumn) => (
          <TrelloColumn
            key={trelloColumn.key}
            idcko={trelloColumn.key}
            nextPls={moreGiveMeMoreGiveMeMore}
            deleteColumnPls={deleteColumnPls}
            isNextColomn={trelloColumn?.isNextColomn}
            initText={trelloColumn.initText}
          />
        ))}
      </div>
    </>
  );
}
