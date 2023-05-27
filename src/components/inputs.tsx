/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  TBasicInput,
  TInputWithSelect,
  TBasicTextArea,
  TInputForAmount,
  TInputWithDate,
  TDropdownWithDelete,
} from '../types/components-types';
import {
  ArrowIcon, DeleteIcon, PlusIcon, MinusIcon, ClockIcon, ClearArrowIcon,
} from './icons';
import { getNumberOfRest } from '../services/constants/utils';
import { TApprover, TDepartment } from '../types/apiTypes';

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
 z-index: 99999999;
    padding: 5px;
    overflow-y: auto;
    top: 70px;
    flex-direction: column;
    height: 50px;
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

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const CheckBox = styled.input<{ isChecked: boolean }>`
  position: relative;
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background:${({ isChecked }) => (isChecked ? 'transparent' : 'rgba(0, 143, 250, 1)')}; ;
  }
`;

const InputWithSelect: FC<TInputWithSelect> = ({
  value, title, onChange, onOptionClick, propertiesArray, isDataOpen, dataArray, deleteItem,
}) => {
  const [isDeleteListOpen, openDeleteList] = useState(false);


  return (
    <InputWrapper>
      <InputTitle htmlFor='list'>{title}</InputTitle>
      <Input id='list' value={value} onChange={onChange} />
      {dataArray!.length >= 1
        && (
          <DeleteIcon
            top={36}
            right={38}
            onClick={() => { openDeleteList(!isDeleteListOpen); }} />
        )}
      <ArrowIcon isActive={isDataOpen} onClick={() => { onChange(); openDeleteList(false); }} />
      {isDeleteListOpen && dataArray!.length >= 1
        && (
          <DeleteList>
            {dataArray && dataArray.map((el) => (
              <DeleteListItem>
                {el.name}
                <DeleteIcon top={5} right={44} onClick={() => deleteItem(el.name)} />
              </DeleteListItem>
            ))}
          </DeleteList>
        )}
      {!isDataOpen && !isDeleteListOpen
        && (
          <List>
            {dataArray!.slice(0, 5).map((el, index) => (
              <ListItem
                onClick={() => { openDeleteList(!isDeleteListOpen); }}
                key={el.id}
                pos={index}>
                {getNumberOfRest(index, dataArray!)}
              </ListItem>
            ))}
          </List>
        )}
      {isDataOpen && !isDeleteListOpen
        && (
          <Datalist>
            {propertiesArray && propertiesArray?.map((el) => (
              <DataListItem key={el.id} onClick={onOptionClick}>
                {el.name}
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
  onChange, title, type, error, name, salary, placeholder, value,
}) => (
  <InputWrapper>
    <InputTitle htmlFor='base'>{title}</InputTitle>
    <Input value={value} placeholder={placeholder} name={name} id='base' type={type} onChange={onChange} />
    <Error>{error}</Error>
    {salary
      && (
        <CheckBoxContainer>
          <CheckBox isChecked type='checkbox' id='check' />
          <InputTitle htmlFor='check'>Включая налоги</InputTitle>
        </CheckBoxContainer>
      )}
  </InputWrapper>
);

const TextArea: FC<TBasicTextArea> = ({ title, onChange, value, name }) => (
  <InputWrapper>
    {title && <InputTitle htmlFor='area'>{title}</InputTitle>}
    <BasicTextArea name={name} value={value} id='area' onChange={onChange} />
  </InputWrapper>
);

const InputWithDate: FC<TInputWithDate> = ({ title, value, onClick }) => {
  const inputRef = useRef();
  return (
    <InputWrapper>
      <InputTitle htmlFor='base'>{title}</InputTitle>
      <ClockIcon />
      <InputCalendar value={value} placeholder='' type='date' onChange={onClick} />

    </InputWrapper>
  );
};

const DropdownBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const DropdownButton = styled.button`
  border: none;
  outline: none;
  height: 36px;
  position: relative;
  background-color:  rgba(26, 56, 96, 0.1);
  color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  width: 100%;
  text-align: inherit;
  text-overflow: ellipsis;
    white-space: nowrap;
   
`;

const DropdownList = styled.ul`
  padding: 0;
  margin: 0;
  background: rgb(240, 244, 246);
  display: flex;
  flex-direction: column;
  list-style: none;
  position: absolute;
    width: 100%;
    top: 41px;
    left: 0;
    z-index: 500;
`;

const DropdownListPlaceItem = styled.li`
   color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  gap: 105px;
  display: flex;
  align-items: center;
  line-height: 22px;
  cursor: pointer;
  text-align: initial;
    margin-left: 7px;
  
    :hover {
      color: ${({ theme: { mainButtonsColor } }) => mainButtonsColor};
    }
`;
const BoxesHeader = styled.h3`
 margin: 0;
 margin-bottom: 7px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: ${({ theme: { labelColor } }) => labelColor};
`;

const ColorListButton = styled.button`
  border: none;
  outline: none;
  height: 36px;
  position: relative;
  background-color:  #1A38601A;
  
 height: 37px;
  width: 67px;

`;

const ColorList = styled.ul`
   padding: 0;
  margin: 0;
  background: rgb(243, 245, 249);
  display: flex;
  flex-direction: column;
  list-style: none;
  position: absolute;
    width: 100%;
    top: 41px;
    left: 0;
    z-index: 20500;
    padding-left: 6px;
    gap: 5px;
`;

const ColorStyleTemplate = styled.li<{ color: string }>`
  width: 25px;
height: 25px;
background:${({ color }) => color};
list-style: none;
border-radius: 50%;
cursor: pointer;
`;

const IconWrapper = styled.div`
  width: 15px;
  height: 15px;
  position: relative;
`;

const DropdownWithDelete: FC<TDropdownWithDelete> = ({
  title, forAprove, forClient, forDivision, forMain, mainArr, divisionArr, clientArr, approversArr,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [division, setDivision] = useState<null | never | TDepartment[]>(divisionArr!);
  const [client, setClient] = useState<null | never | TApprover[] | TDepartment[]>(clientArr!);
  const [approvers, setApprovers] = useState<null | never | TApprover[] | TDepartment[]>(approversArr!);
  const [main, setMain] = useState<null | never | TApprover[] | TDepartment[]>(mainArr!);

  const setCurrentArr = () => {
    if (forAprove) { return approvers || approversArr; }
    if (forClient) { return client || clientArr; }
    if (forDivision) { return division || divisionArr; }
    if (forMain) { return main || mainArr; }
  };



  const deleteItem = (el: string) => {
    const newArr = setCurrentArr()?.filter((elem) => el !== elem.name);
    if (forAprove) { setApprovers(newArr!); }
    if (forClient) { setClient(newArr!); }
    if (forDivision) { setDivision(newArr!); }
    if (forMain) { setMain(newArr!); }
  };

  return (
    <DropdownBox>
      <BoxesHeader>{title}</BoxesHeader>
      <DropdownButton type='button'>
        <ClearArrowIcon isActive={isOpen} onClick={() => setOpen(!isOpen)} />
        {forDivision && division && `Выбрано ${division.length}`}
        {forAprove && approvers && `Выбрано ${approvers.length}`}
        {forClient && client && `Выбрано ${client.length}`}
        {forMain && main && `Выбрано ${main.length}`}
        {isOpen
          && (
            <DropdownList>
              {setCurrentArr()!.map((el) => (
                <DropdownListPlaceItem>
                  {`${el.name.slice(0, 8)}...`}
                  <IconWrapper onClick={(e) => { e.stopPropagation(); deleteItem(el.name); }}>
                    <DeleteIcon top={0} right={0} />
                  </IconWrapper>

                </DropdownListPlaceItem>
              ))}
            </DropdownList>
          )}
      </DropdownButton>
    </DropdownBox>
  );
};

const ColorDropdown: FC<{ colorsArray: string[], globalSet: React.Dispatch<React.SetStateAction<string>>, }> = ({ colorsArray, globalSet }) => {
  const [currentColor, setColor] = useState('hsl(249.873417721519, 100%, 69.01960784313725%)');
  const [isOpen, open] = useState(false);

  return (
    <ColorListButton type='button'>
      <ColorStyleTemplate color={currentColor} />
      <ClearArrowIcon isActive={isOpen} onClick={() => open(!isOpen)} />
      {isOpen && (
        <ColorList>
          {colorsArray.map((item) => (
            <ColorStyleTemplate color={item} onClick={() => { globalSet(item); setColor(item) }} />
          ))}
        </ColorList>
      )}
    </ColorListButton>

  );
};

const Dropdown: FC<{
  items: string[],
  withTitle: boolean,
  title?: string,
  value: string,
  globalSet?: React.Dispatch<React.SetStateAction<string>>,
}> = ({ items, withTitle, title, value, globalSet }) => {
  const [isOpen, setOpen] = useState(false);
  const [division, setDivision] = useState('');
  return (
    <DropdownBox>
      {withTitle && <BoxesHeader>{title}</BoxesHeader>}
      <DropdownButton type='button'>
        <ClearArrowIcon isActive={isOpen} onClick={() => setOpen(!isOpen)} />
        {division || value}
        {isOpen
          && (
            <DropdownList>
              {items.map((el) => (
                <DropdownListPlaceItem onClick={() => { globalSet(el); setDivision(el) }}>{el}</DropdownListPlaceItem>
              ))}
            </DropdownList>
          )}
      </DropdownButton>
    </DropdownBox>
  );
};

export {
  BasicInput,
  InputWithSelect,
  TextArea,
  InputForPositionSelect,
  InputWithDate,
  Dropdown,
  ColorDropdown,
  DropdownWithDelete,
};
