import React from 'react';
import styled from 'styled-components';
import { BasicInput, TextArea, Dropdown, ColorDropdown } from './inputs';


const ModalOverlay = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    position: relative;
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
    background-color ${({ name, theme: { mainButtonsColor } }) => name === 'save' ? mainButtonsColor : '#193B670D'}  ;  
    color: ${({ name, theme: { mainButtonsColor } }) => name === 'save' ? '#FFFFFF' : '#00389A'}  ;    
    margin-top: 28px;
`;

const Modal: FC = () => {
    const actions = ['Звонок', 'Письмо', 'Письмо с датой'];
    const templates = ['Стартовое', 'Анкетирование', 'Певичное инет..', 'Оффер', 'ОнБординг', 'Отказ'];
    const colorShema = ['#7B61FF', '#7B61FF1A', '#008FFA1A', '#FFDA151A', '#0788361A', '#FF4E580D'];
    const value = `Уважаемый  [Имя Фамилия] приглашаем на нашу вакансию [Название вакансии]`;
    const modalValue = `Приглашаем на вакансию [Название вакансии]

    О вакансии
    [Описание вакансии]
    Просим ответить на несколько вопросов
    Опишите, был ли у вас подобный опыт работы над проектами в данной тематике?
    Когда вам было бы удобно пообщаться с руководителем проекта?
    Какие у вас зарплатные ожидания?`;
    return (
        <ModalOverlay>
            <ModalContainer>
                <LeftBox>
                    <BoxHeader>Создание этапа</BoxHeader>
                    <BasicInput title='Название' />
                    <ColorDropdown colorsArray={colorShema} />
                    <Dropdown withTitle title='Действие' items={actions} />
                </LeftBox>
                <RightBox>
                    <Dropdown withTitle title='Шаблон' items={templates} />
                    <BasicInput value={value} title='Тема письма' />
                    <TextArea value={modalValue} />
                    <ButtonWrapper>
                        <OptionButton type='button' name='cancel'>Отмена</OptionButton>
                        <OptionButton name='save'>Сохранить</OptionButton>
                    </ButtonWrapper>
                </RightBox>
            </ModalContainer>
        </ModalOverlay >
    )
}

export default Modal;