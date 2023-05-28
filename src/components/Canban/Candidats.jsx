/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/button-has-type */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import './canban.css';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from '../../store/store.type';
import getAndSetDataToStandart from '../../thunks/map-whole-data-thunk';
import { openStagePopup, openCanbanPopup } from '../../store/userAndOrganizationSlice';
import { setEmail } from '../../store/resumeSlice';
import { setCurrentVacancyObject } from '../../store/vacancyRequestsSlice';
// const createNewItem = (name, status, id) => {
//   class Item {
//     constructor(itemName, itemStatus, itemId) {
//       this.itemName = itemName;
//       this.itemStatus = itemStatus;
//       this.itemId = itemId;
//     }
//   }
//   return new Item(name, status, id);
// };

const DragAndDrop = () => {
  const location = useLocation();
  const { mappedData } = useSelector((state) => state.resume);
  const { currentVacancy, timer } = useSelector((state) => state.request);
  /*  const initialData = {
     containers: {
       container1: {
         name: 'Container 1',
         key: 'container1',
         items: [
           { itemName: 'Item 1', status: 'ok', id: 'item1' },
           { itemName: 'Item 2', status: 'ok', id: 'item2' },
         ],
       },
       container2: { name: 'Container 2', key: 'container2', items: [] },
       container3: { name: 'Container 3', key: 'container3', items: [] },
       container4: { name: 'Container 4', key: 'container4', items: [] },
       container5: { name: 'Container 5', key: 'container5', items: [] },
       container6: { name: 'Container 6', key: 'container6', items: [] },
       container7: { name: 'Container 7', key: 'container7', items: [] },
       container8: { name: 'Container 8', key: 'container8', items: [] },
       container9: { name: 'Container 9', key: 'container9', items: [] },
       container10: { name: 'Container 10', key: 'container10', items: [] },
     },
   }; */
  const [dragStatus, setDragStatus] = useState(null);
  const [appData, setAppData] = useState(mappedData);
  const [runTest, setRunTest] = useState(false);
  const [currentContainer, setCurrentContainer] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [sec, setSec] = useState(0);
  const handleMoveItemToNewContainer = (
    currentState,
    newContainer,
    currentContainer,
    itemId,
    index,
  ) => {
    const newState = JSON.parse(JSON.stringify(currentState));

    const newContainerItems = newState[`container${newContainer}`].items;
    const currentContainerItems = newState[`container${currentContainer}`].items;

    const itemToMove = currentContainerItems.find(
      (item) => itemId === item.id,
    );

    if (newContainer === currentContainer) {

    } else {
      newState[`container${newContainer}`].items = [
        ...newContainerItems,
        itemToMove,
      ];
      newState[`container${currentContainer}`].items = [
        ...currentContainerItems.filter((item) => item.id !== itemId),
      ];

      setAppData(newState);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAndSetDataToStandart(+(location.pathname.slice(11))));
    setTimeout(() => setAppData(mappedData), 5000);
  }, [dispatch]);

  return (
    mappedData && appData
    && (
      <div className='drag-and-drop'>

        <div className='drag-and-drop__header'>
          <h1>{currentVacancy}</h1>
        </div>
        <div className='drag-and-drop__content'>
          {Object.keys(mappedData).map((container) => (

            <DropContainer
              setCurrentContainer={setCurrentContainer}
              name={mappedData[container].name}
              id={container}
              containerKey={mappedData[container].key}
              items={appData[container].items}
              handleMoveItemToNewContainer={handleMoveItemToNewContainer}
              currentContainer={currentContainer}
              appData={appData}
              setItemId={setItemId}
              itemId={itemId} />
          ))}
        </div>
      </div>
    )

  );
};

const DropContainer = ({
  items,
  name,
  setCurrentContainer,
  handleMoveItemToNewContainer,
  currentContainer,
  appData,
  containerKey,
  setItemId,
  itemId,
}) => {
  const [isHovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const dragDrop = (e) => {
    e.preventDefault();
    dispatch(openCanbanPopup(true));
    handleMoveItemToNewContainer(
      appData,
      containerKey,
      currentContainer,
      itemId,
      0,
    );
  };

  return (
    <div className='column'>
      <div className='column__toolbar'>
        <h2 className='column__name'>{name}</h2>
        {/* <ColumnOptions isHovered={isHovered} /> */}
      </div>
      <ul
        className='drop-container'
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={dragDrop}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        {items && items.length > 0
          ? items.map((item, index) => (
            <DraggableItem
              itemName={item.itemName}
              itemId={item.id}
              setItemId={setItemId}
              setCurrentContainer={setCurrentContainer}
              currentContainerName={containerKey}
              itemCity={item.city}
              rating={item.rating}
              mail={item.mail} />
          ))
          : 'Перенесите кандидата'}
      </ul>
    </div>
  );
};

const DraggableItem = ({
  itemName,
  itemId,
  status = 'ok',
  currentContainerName,
  setCurrentContainer,
  setItemId,
  itemCity,
  rating,
  mail,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePrepForDrop = () => {
    setItemId(itemId);
    setCurrentContainer(currentContainerName);
  };
  return (
    <li
      onClick={() => navigate(`/candidats/page/${itemId}`)}
      className={`draggable-item draggable-item--${status}`}
      draggable='true'
      onDragStart={() => {
        handlePrepForDrop();
      }}
      onDragEnter={() => { dispatch(setCurrentVacancyObject(itemId)); }}>
      <h3 className='draggable-item__name'>{itemName}</h3>
      <span className='my-span'>
        {itemCity}
        <div className='my-div'>
          {`${rating}%`}
        </div>

      </span>
    </li>
  );
};

const ColumnOptions = ({ isHovered }) => {
  const [isOpen, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className='column-options__container'>
      <button
        aria-label='View column options'
        className='column-options__toggle'
        onClick={() => handleToggle()}>
        {isOpen ? '×' : '…'}
      </button>
      <div
        className={`column-options__option-panel column-options__option-panel--${isOpen ? 'active' : 'default'
          }`}>
        <button>Edit Column Name</button>
        <button>Add Item</button>
      </div>
    </div>
  );
};

export default DragAndDrop;
