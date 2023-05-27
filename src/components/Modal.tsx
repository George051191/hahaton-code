/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import {
  BasicInput, TextArea, Dropdown, ColorDropdown,
} from './inputs';
import { useSelector, useDispatch } from '../store/store.type';
import { setStages } from '../store/vacancyRequestsSlice';

const ModalOverlay = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    z-index: 9999999;
`;

const ModalContainer = styled.form`
   z-index: 10000;
max-width: 1190px;
width: 100%;

background:${({ theme: { bgColor } }) => bgColor};
border: 1px solid rgba(25, 59, 103, 0.05);
box-shadow: 0px 18px 64px -8px rgba(28, 50, 79, 0.38), 0px 4px 24px -3px rgba(28, 55, 90, 0.16);
border-radius: 8px;
display: flex;
`;

const LeftBox = styled.div`
padding-top: 37px;
padding-left: 31px;
padding-right: 42px;
gap: 10px;
    width: 348px;
min-height: 703px;
background: #F3F5F9;
border: 1px solid rgba(25, 59, 103, 0.05);
border-radius: 8px 0px 0px 8px;
display: flex;
flex-direction: column;
& input {
    background-color: #1A38601A;
    font-weight: 600;
font-size: 18px;
width: 262px;
}
& ul {
    background-color: rgb(213 221 233) ;
}
`;

const RightBox = styled.div`
padding-top: 37px;
padding-left: 20px;
padding-right: 20px;
position: relative;
gap: 22px;
    width: 100%;
    min-height: 703px;
    display: flex;
    flex-direction: column;
    & button {
        width: 286px;
    }
    & textarea {
        min-height: 272px;
    }
`;

const BoxHeader = styled.h3`
    font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 22px;
line-height: 125.3%;
color: #192434;
margin: 0;
margin-bottom: 29px;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 200px;
    display: flex;
    gap: 10px;
    padding: 5px;
`;

const OptionButton = styled.button<{ name: string }>`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    border: none;
    outline: none;
    display: flex;
    cursor: pointer;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
  
    height: 33px;
    background-color ${({ name, theme: { mainButtonsColor } }) => (name === 'save' ? mainButtonsColor : '#193B670D')}  ;  
    color: ${({ name, theme: { mainButtonsColor } }) => (name === 'save' ? '#FFFFFF' : '#00389A')}  ;    
    margin-top: 28px;
`;

const Modal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { approveStages } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const portalRoot = useMemo(() => document.getElementById('modal'), []) as Element;
  const actions = ['Звонок', 'Письмо', 'Письмо с датой'];
  const [actionForForm, setAction] = useState<string>('');
  const [templateForForm, setTemplate] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [color, setColorFor] = useState<string>('');
  const [value, setValue] = useState<string>('Уважаемый  [Имя Фамилия] приглашаем на нашу вакансию [Название вакансии]');
  const [modalValue, setModalValue] = useState<string>(`Приглашаем на вакансию [Название вакансии]
  
  О вакансии
  [Описание вакансии]
  Просим ответить на несколько вопросов
  Опишите, был ли у вас подобный опыт работы над проектами в данной тематике?
  Когда вам было бы удобно пообщаться с руководителем проекта?
  Какие у вас зарплатные ожидания?`);
  const templates = ['Стартовое', 'Анкетирование', 'Певичное инет..', 'Оффер', 'ОнБординг', 'Отказ'];
  const colorShema = ['#483f72', '#7B61FF1A', '#008FFA1A', '#FFDA151A', '#0788361A', '#FF4E580D'];

  const addStage = (e: any) => {
    e.preventDefault();
    const stageNew = {
      id: Math.random(),
      title: name,
      approvers: [],
      action: actionForForm,
      template: templateForForm,
      bgColor: color,
      border: 'rgba(255, 231, 17, 1)',
      isFinal: false,
    };
    dispatch(setStages([...approveStages, stageNew]));
  };

  return ReactDOM.createPortal(
    (<ModalOverlay>
      <ModalContainer>
        <LeftBox>
          <BoxHeader>Создание этапа</BoxHeader>
          <BasicInput onChange={(e) => setName(e.target.value)} title='Название' />
          <ColorDropdown globalSet={setColorFor} colorsArray={colorShema} />
          <Dropdown globalSet={setAction} withTitle title='Действие' items={actions} />
        </LeftBox>
        <RightBox>
          <Dropdown globalSet={setTemplate} withTitle title='Шаблон' items={templates} />
          <BasicInput onChange={(e) => setValue(e.target.value)} value={value} title='Тема письма' />
          <TextArea onChange={(e) => setModalValue(e.target.value)} value={modalValue} />
          <ButtonWrapper>
            <OptionButton onClick={onClose} type='button' name='cancel'>Отмена</OptionButton>
            <OptionButton type='button' onClick={(e) => { onClose(); addStage(e); }} name='save'>Сохранить</OptionButton>
          </ButtonWrapper>
        </RightBox>
      </ModalContainer>
    </ModalOverlay>
    ), portalRoot,
  );
};

export default Modal;
