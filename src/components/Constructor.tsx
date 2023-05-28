/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ClearPlusIcon, PencilIcon, GarbageIcon, ThreeIcon,
} from './icons';
import { Dropdown } from './inputs';
import { TConstructor } from '../types/components-types';
import { getNumberInArray, getNumberOfRest } from '../services/constants/utils';
import { openStagePopup } from '../store/userAndOrganizationSlice';
import { useDispatch, useSelector } from '../store/store.type';
import { TApproveStage, TApprover } from '../types/apiTypes';
import { setStages } from '../store/vacancyRequestsSlice';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    
 `;
const SectionTitle = styled.h1`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 125%;
    margin: 0;
    color: ${({ theme: { headerH1 } }) => headerH1};
   
 `;

const TableHeader = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns:157px 153px 170px 170px 41px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    max-width: 680px;
    width: 100%;
    column-gap: 12px;
`;
const TableHeaderItem = styled.li`
    color:${({ theme: { headerH1 } }) => headerH1};
   
    
`;

const Grid = styled.div<{ bgColor: string, border: string }>`
    display: grid;
    grid-template-columns: 157px 153px 170px 170px 41px;
    background-color: ${({ bgColor }) => bgColor};
    max-width: 745px;
    width: 100%;
    height: 48px;
    column-gap: 12px;
    border-left:${({ border }) => border} 4px solid ; 
    margin-top: 7px;
`;
const Input = styled.p`
    background-color: transparent;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: #000000;
    outline: none;
    border: none;
    padding-left: 5px;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Contributors = styled.ul`
    position: relative;
    background-color: transparent;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
`;

const AddButton = styled.button`
    cursor: pointer;
   border: none;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #DDE2EA;
    border-radius: 48px;
    margin-left: -1px;
`;

const IconContainer = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;

const DropdownWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
`;

const IconWrapper = styled.div<{ stats: 'red' | 'grey' | 'blue' }>`
    width: 30px;
    height: 23px;
    background: ${({ stats }) => (stats === 'red' ? 'rgba(255, 78, 88, 0.05)'
    : stats === 'grey' ? 'rgba(243, 245, 249, 1)'
      : 'rgba(25, 59, 103, 0.05)')
};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CoardinatngsList = styled.ul`
  padding: 0;
  margin: 0;
  background: rgb(243, 245, 249);
  display: flex;
  flex-direction: column;
  list-style: none;
  position: absolute;
  width: 120px;
  z-index: 500;
  top: 0;
    right: 162px;
    border: 1px solid black;

`;
const CoardinatingsListItem = styled.li`
   color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
  text-align: initial;
    margin-left: 7px;
    :hover {
      color: ${({ theme: { mainButtonsColor } }) => mainButtonsColor};
    }
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

const OptionButton = styled.button`
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
    width: 130px;
    height: 33px;
    background-color:rgba(25, 59, 103, 0.05);
    color: ${({ theme: { mainButtonsColor } }) => mainButtonsColor}  ;    
    margin-top: 28px;
    margin-bottom:28px;
    position: relative;
    left: -311px;

`;

const Constructor: FC<TConstructor> = ({ levelsArray }) => {
  const dispatch = useDispatch();
  const [isOpen, open] = useState(false);
  const [approveArr, pushToArr] = useState([]);
  const [current, setCurrent] = useState('');
  const actions = ['Звонок', 'Письмо', 'Письмо с датой'];
  const templates = ['Стартовое', 'Анкетирование', 'Певичное инет..', 'Оффер', 'ОнБординг', 'Отказ'];
  const { allSystemUsers } = useSelector((state) => state.allBaseData);
  const { currentRequestData, approveStages } = useSelector((state) => state.request);
  const pushAndCheckToArr = (elem: string, curTitle: string, index: number) => {
    /*  const w = arr.find(elArr => { console.log(elArr, elem); elArr.name !== elem })
     if (w) { console.log(elem, curTitle); return; } */

    if (curTitle === current) {
      const approver = currentRequestData?.approvers?.find((user) => user.name === elem);

      const copy = [...approveArr];
      if (copy[index].find((w) => w.name === elem)) { return; }
      if (approveArr.length === 0) {
        copy[index] = [approver];
        pushToArr(copy);
      } else {
        const modeArr = [...approveArr[index], approver];

        copy[index] = modeArr;

        pushToArr(copy);
      }
    }
  };

  const deleteStage = (id: number) => {
    const filteredStageArr = levelsArray.filter((arrStageEl) => arrStageEl.id !== id);
    dispatch(setStages(filteredStageArr));
  };

  useEffect(() => {
    const newFilledArr = Array(20).fill([]);
    pushToArr(newFilledArr);
  }, []);

  return (
    <Layout>
      <SectionTitle>Этапы согласования кандидатов</SectionTitle>
      <TableHeader>
        <span />
        <TableHeaderItem>Участники</TableHeaderItem>
        <TableHeaderItem>Действие</TableHeaderItem>
        <TableHeaderItem>Шаблон</TableHeaderItem>
        <span />
      </TableHeader>
      {levelsArray.map((el, indx) => (
        <Grid border={el.border} bgColor={el.bgColor}>
          <Input>
            <ThreeIcon />
            {el.title}

          </Input>
          <Contributors>
            {/* это массив с бека */}
            {' '}
            {approveArr[indx] && approveArr[indx].concat(el.approvers) && approveArr[indx].slice(0, 5).map((item, index) => (
              <ListItem
                key={item}
                pos={index}>
                {getNumberInArray(indx, index, approveArr)}
              </ListItem>
            ))}
            <AddButton onClick={() => { setCurrent(el.title); open(!isOpen); }}>
              <ClearPlusIcon />
            </AddButton>
            {isOpen && current === el.title && (
              <CoardinatngsList>
                {currentRequestData?.approvers.map((elem) => (
                  <CoardinatingsListItem
                    onClick={() => pushAndCheckToArr(elem.name, el.title, indx)}>
                    {elem.name}
                  </CoardinatingsListItem>
                ))}
              </CoardinatngsList>
            )}
          </Contributors>
          <DropdownWrapper>
            <Dropdown value={el.action} withTitle={false} items={actions} />
          </DropdownWrapper>
          <DropdownWrapper>
            <Dropdown value={el.template} withTitle={false} items={templates} />
          </DropdownWrapper>

          <IconContainer>

            <IconWrapper stats='red'>
              <GarbageIcon onClick={() => deleteStage(el.id)} />
            </IconWrapper>
          </IconContainer>
        </Grid>

      ))}
      <OptionButton onClick={() => dispatch(openStagePopup(true))}>Добавить этап</OptionButton>
    </Layout>
  );
};

export default Constructor;
