import { useState, useEffect } from 'react';
import styles from './trello.module.css';

export default function TrelloFinishedColomn({functionsWrapper, isDraggedUnder, topic, setTopic, index, setIsColomn, setFinishedIsColomn, idcko}) {
    const [isBeingDragged, setIsBeingDragged] = useState(false);
    const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [colomnItems, setColomnItems] = useState([{isInitItem: false, value: "blabla", key:getRandomId()}, {isInitItem: true, key:getRandomId()}]);

    useEffect(() => {
        document.addEventListener("dragstart", function( event ) {
          event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
        }, false);
      }, []);

    function getRandomId() {
        const min = 0;
        const max = 999999999999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

    const updateInitialOffset = (event) => {
        setInitialOffset({
          x: event.clientX - position.x,
          y: event.clientY - position.y,
        });
      };

    function removeCreatedColomn() {
        new Audio('/cancelSloupecVyrobeny.mp3').play();
        setIsColomn(false);
        setFinishedIsColomn(false);
        setTopic('');
        functionsWrapper.deleteColumnPls(idcko);
      }

    const elementStyle = isBeingDragged ? 
      {
      position: 'relative',
      left: position.x + 'px', top: position.y + 'px'
      } : null;
  
    const handleDrag = (event) => {
        if (isBeingDragged) {
          setPosition({
            x: event.clientX - initialOffset.x,
            y: event.clientY - initialOffset.y,
          });
        }
      };

    return (
        <>
        <div className={styles.TrelloColomn}
           style = {{...elementStyle,  opacity: isDraggedUnder ? "0.1" : "1" }}
           draggable 
           onDragStart={(e) => {
            setIsBeingDragged(true); updateInitialOffset(e); functionsWrapper.onDragStartF(e, index)}}
            onDragLeave={(e) => functionsWrapper.onDragLeaveF(e, index)}
            onDragEnter={(e) => {functionsWrapper.onDragEnterF(e, index)}}
           onDragEnd ={(e) => {setIsBeingDragged(false); functionsWrapper.onDragEndF(e); setInitialOffset({ x: 0, y: 0 }); setPosition({ x: 0, y: 0 })}}
           onDrag = {handleDrag}>
            <input draggable="False" className={styles.TrelloColomnInputFinished} placeholder={topic}/>
            <button
              className={styles.cancelButtonFinished}
              onClick={removeCreatedColomn}
            >X
            </button>
            {colomnItems.map(item => 
                {
                    if (item.isInitItem===true){
                        return (
                        <button>+Přidat kartu...</button>
                        );
                    } else return (<input placeholder={item.value}></input>)
                }
                )}
          </div>
        </>
    );
}