/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import {
  TBasicInput, TInputWithSelect, TBasicTextArea, TInputForAmount, TInputWithDate,
} from '../types/components-types';
import {
  ArrowIcon, DeleteIcon, PlusIcon, MinusIcon, ClockIcon,
} from './icons';

const Input = styled.input`
border: none;
outline: none;
padding-left: 7px;
    width: 100%;
    height: 36px;
    background-color: ${({ theme: { inputBg } }) => inputBg};
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
`;

const InputCalendar = styled.input`
     position: relative;
     border: none;
    outline: none;
    padding-left: 7px;
    width: 100%;
    height: 36px;
    background-color: ${({ theme: { inputBg } }) => inputBg};
    font-family: 'Inter';
        font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme: { inputValuesColor } }) => inputValuesColor};

     &::-webkit-calendar-picker-indicator {
    position: absolute;
     top: 0;
     left: 0;
    right: 0;
    bottom: 0;
     width: auto;
     height: auto;
     color: transparent;
     background: transparent;
     }
     &::-webkit-inner-spin-button {
        z-index: -10;
     }
     &::-webkit-clear-button {
        z-index: -10;
     }
     &::-webkit-input-placeholder {
    z-index: -200;
    
}
    &::placeholder {
     z-index: -200;
     
}
& :before {content: attr(placeholder);
  width: 100%;}
`;

const InputSelectAmount = styled.input`
    border: none;
outline: none;
padding-left: 50%;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 36px;
    background-color: ${({ theme: { inputBg } }) => inputBg};
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: ${({ theme: { inputValuesColor } }) => inputValuesColor};

`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    width: 100%;
`;

const InputTitle = styled.label`
margin: 0;
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
display: flex;
align-items: center;
color: ${({ theme: { labelColor } }) => labelColor};
`;

const Error = styled.span`
    color:${({ theme: { secondaryButtonsColor } }) => secondaryButtonsColor};
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 17px;
`;

const Datalist = styled.datalist`
       position: absolute;
       background-color: ${({ theme: { inputBg } }) => inputBg};
    
    display: flex;
    width: 100%;
 
    padding: 5px;
    overflow-y: auto;
    top: 70px;
    flex-direction: column;
   
    padding-left: 7px;
    transition: all ease .5s;
`;

const DataListItem = styled.option`
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 17px;
margin-bottom: 5px;
color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
cursor: pointer;
&:hover {
    color: rgba(0, 56, 154, 1);
}
`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
 
`;

const DeleteList = styled.ul`
     position: absolute;
       background-color: ${({ theme: { inputBg } }) => inputBg};
    
    display: flex;
    width: 100%;
 
    padding: 5px;
    overflow-y: auto;
    top: 53px;
    flex-direction: column;
    list-style: none;
  
    padding-left: 7px;
    transition: all ease .5s;
`;
const DeleteListItem = styled.li`
      font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 17px;
margin: 0;
padding: 0;
position: relative;
margin-bottom: 7px;
color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
cursor: pointer;
&:hover {
    color: rgba(0, 56, 154, 1);
}
`;

const BasicTextArea = styled.textarea`
    border: none;
outline: none;
padding-left: 7px;
    width: 100%;
    min-height: 60px;
    background-color: ${({ theme: { inputBg } }) => inputBg};
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
`;

const ListItem = styled.li<{ pos: number }>`
    padding: 0;
    margin: 0;
    margin-right: -6px;
    z-index: 10;
    width: 32px;
    height: 32px;
    background-color:${({ pos }) => (
    pos === 0 ? '#FF4E58'
      : pos === 1 ? '#DF0B92'
        : pos === 2
          ? '#650ACC'
          : pos === 3
            ? '#097FAA'
            : 'rgba(26, 56, 96, 0.1)')} ;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: ${({ pos, theme: { bgColor } }) => (pos === 4 ? 'rgba(27, 43, 65, 0.69)' : bgColor)};
cursor: pointer;
`;

const InputWithSelect: FC<TInputWithSelect> = ({
  value, title, onChange, onOptionClick, propertiesArray, isDataOpen, dataArray, deleteItem,
}) => {
  const [isDeleteListOpen, openDeleteList] = useState(false);

  const getNumberOfRest = (index: number, array: string[]) => {
    if (index === 4) {
      return `+${array.length - 4}`;
    }
    const Tab = array[index].indexOf(' ');
    return array[index][0] + array[index][Tab + 1];
  };
  return (
    <InputWrapper>
      <InputTitle htmlFor='list'>{title}</InputTitle>
      <Input id='list' value={value} onChange={onChange} />
      {dataArray.length >= 1
              && (
              <DeleteIcon
                top={36}
                right={38}
                onClick={() => { openDeleteList(!isDeleteListOpen); }} />
              )}
      <ArrowIcon isActive={isDataOpen} onClick={() => { onChange(); openDeleteList(false); }} />
      {isDeleteListOpen && dataArray.length >= 1
                && (
                <DeleteList>
                  {dataArray.map((el) => (
                    <DeleteListItem>
                      {el}
                      <DeleteIcon top={5} right={44} onClick={() => deleteItem(el)} />
                    </DeleteListItem>
                  ))}
                </DeleteList>
                )}
      {!isDataOpen && !isDeleteListOpen
                && (
                <List>
                  {dataArray.slice(0, 5).map((el, index) => (
                    <ListItem
                      onClick={() => { openDeleteList(!isDeleteListOpen); }}
                      key={el}
                      pos={index}>
                      {getNumberOfRest(index, dataArray)}
                    </ListItem>
                  ))}
                </List>
                )}
      {isDataOpen && !isDeleteListOpen
                && (
                <Datalist>
                  {propertiesArray.map((el) => (
                    <DataListItem key={el} onClick={onOptionClick}>
                      {el}
                    </DataListItem>
                  ))}
                </Datalist>
                )}
    </InputWrapper>
  );
};

const InputForPositionSelect: FC<TInputForAmount> = ({
  onIncrease, onDecrease, value, title,
}) => (
  <InputWrapper>
    <InputTitle htmlFor='base'>{title}</InputTitle>
    <MinusIcon onClick={onDecrease} />
    <InputSelectAmount id='base' value={value} />
    <PlusIcon onClick={onIncrease} />

  </InputWrapper>
);

const BasicInput: FC<TBasicInput> = ({
  onChange, title, type, error, name,
}) => (
  <InputWrapper>
    <InputTitle htmlFor='base'>{title}</InputTitle>
    <Input name={name} id='base' type={type} onChange={onChange} />
    <Error>{error}</Error>
  </InputWrapper>
);

const TextArea: FC<TBasicTextArea> = ({ title, onChange }) => (
  <InputWrapper>
    <InputTitle htmlFor='area'>{title}</InputTitle>
    <BasicTextArea id='area' onChange={onChange} />
  </InputWrapper>
);

const InputWithDate: FC<TInputWithDate> = ({ title, value, onClick }) => {
  const inputRef = useRef();
  return (
    <InputWrapper>
      <InputTitle htmlFor='base'>{title}</InputTitle>
      <ClockIcon onClick={() => inputRef.current.click()} />
      <InputCalendar ref={inputRef} value={value} placeholder='' type='date' onChange={onClick} />

    </InputWrapper>
  );
};

export {
  BasicInput, InputWithSelect, TextArea, InputForPositionSelect, InputWithDate,
};
