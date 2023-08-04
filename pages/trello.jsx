import styles from './trello.module.css';
import Head from 'next/head';
import TrelloColumn from '../components/TrelloColomn';
import { useState, useRef } from 'react';

export default function TrelloPage() {
  const [trelloColumns, setTrelloColumns] = useState([{ key: getRandomId(), initText: "Přidat sloupec", isDraggedUnder: false }]);
  const dragItem = useRef();
  const dragOverItem = useRef();
 
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };
 
  const onDragLeaveF = () =>
  {
    if(dragOverItem.current == dragItem.current){
      const copyListItems = [...trelloColumns];
      const dragItemContent = copyListItems[dragItem.current];
      dragItemContent.isDraggedUnder = false;
      copyListItems[dragItem.current] = dragItemContent;
      setTrelloColumns(copyListItems);
    }
  };

  const onDragEnterF  = (e, position) => {
    e.preventDefault();
    if(dragOverItem.current == dragItem.current){
      const copyListItems = [...trelloColumns];
      const dragItemContent = copyListItems[dragItem.current];
      dragItemContent.isDraggedUnder = true;
      copyListItems[dragItem.current] = dragItemContent;
      setTrelloColumns(copyListItems);
    }
    dragOverItem.current = position;
  };

  const drop = (e) => {
    let copyListItems = [...trelloColumns];
    let dragItemContent = copyListItems[dragItem.current];
    copyListItems[dragItem.current]= copyListItems[dragOverItem.current];
    copyListItems[dragOverItem.current]= dragItemContent;
    dragItem.current = null;
    dragOverItem.current = null;
    copyListItems.forEach(item => item.isDraggedUnder = false)
    console.log(trelloColumns)
    console.log(copyListItems)
    setTrelloColumns(copyListItems);
  };

  function getRandomId() {
    const min = 0;
    const max = 999999999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function moreGiveMeMoreGiveMeMoreIfIHadAHeartIWouldLoveYouIfIHadAVoiceIWouldSing() {
    const newTrelloColumns = [...trelloColumns];
    newTrelloColumns.push({ key: getRandomId(), isNextColomn: true, isDraggedUnder: false });
    setTrelloColumns(newTrelloColumns);
  };

  function deleteColumnPls(key) {
    let newTrelloColumns = [...trelloColumns];
    newTrelloColumns = newTrelloColumns.filter((item) => {
      return item.key !== key;
    });
    //shouldnt ever by empty, at least one "init colomn" should be present
    if (newTrelloColumns.length == 0) {
      newTrelloColumns.push({ key: getRandomId(), initText: "Přidat sloupec" });
    }
    //if there is only one = it must be non finished one, therefore it must have proper init text
    if (newTrelloColumns.length == 1) {
      newTrelloColumns[0].initText = "Přidat sloupec";
    }
    setTrelloColumns(newTrelloColumns);
  };

  const functionsWrapper = {
    nextPls: moreGiveMeMoreGiveMeMoreIfIHadAHeartIWouldLoveYouIfIHadAVoiceIWouldSing,
    deleteColumnPls: deleteColumnPls,
    onDragStartF: dragStart,
    onDragEnterF: onDragEnterF,
    onDragEndF: drop,
    onDragLeaveF:onDragLeaveF
  };

  return (
    <>
      <Head>
        <link rel="icon" href="images/favicon.ico" />
      </Head>
      <div className={styles.topBar} >
        <h3>Nástěnka Totálně Ne Trello</h3>
      </div>
      <div className={styles.mainDivWrapper} id="style-2">
        {trelloColumns.map((trelloColumn, index) => (
          <TrelloColumn
            index={index}
            key={trelloColumn.key}
            idcko={trelloColumn.key}
            isDraggedUnder={trelloColumn.isDraggedUnder}
            isNextColomn={trelloColumn?.isNextColomn}
            initText={trelloColumn.initText}
            functionsWrapper={functionsWrapper}
          />
        ))}
      </div>
    </>
  );
}
