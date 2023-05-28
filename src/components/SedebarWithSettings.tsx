/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  DropdownWithDelete, InputWithDate, InputForPositionSelect, BasicInput,
} from './inputs';
import { useDispatch, useSelector } from '../store/store.type';
import getCurrentRequestsThunk from '../thunks/get-current-request-thunk';

const Sidebar = styled.aside`
    position: fixed;
    top: 51px;
    right: 0;
    height: 100vh;
    width: 236px;
    background-color: ${({ theme: { sidebarColor } }) => sidebarColor};
    display: flex;
    flex-direction: column;
    padding-top: 34px;
    padding-bottom: 34px;
    padding-left: 10px;
    padding-right: 10px;
    overflow: auto;
    z-index: 200000;

`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 1000px;
    gap: 48px;
`;
type TSideBar = {
  date: Date;
  setDate: any;
  amount: number;
  setAmount: any;
  salaryValue: number;
  setValue: any;
  onDecrease: () => void;
  onIncrease: () => void;
};

const SidebarWithSettings: FC<TSideBar> = ({
  date, setDate, setAmount, setValue, amount, salaryValue, onDecrease, onIncrease,
}) => {
  const { currentRequestData, currentRequestId } = useSelector((state) => state.request);
  const { currentUser } = useSelector((state) => state.allBaseData);
  const dispatch = useDispatch();

  return (
    currentRequestData
    && (
      <Sidebar>
        <ContentWrapper>
          <DropdownWithDelete approversArr={[currentUser!]} title='Ответственные сотрудники ' forAprove />
          <InputWithDate title='Дата закрытия вакансии' value={date} onClick={(e) => setDate(e.target.value)} />
          <DropdownWithDelete divisionArr={currentRequestData?.departments} title='Подразделение' forDivision />
          <DropdownWithDelete clientArr={currentRequestData?.customers} title='Заказчик' forClient />
          <InputForPositionSelect value={amount} onDecrease={onDecrease} onIncrease={onIncrease} title='Количество позиций' />
          <BasicInput type='number' name='salary' salary title='Зарплата' value={salaryValue as unknown as string} onChange={(e) => setValue(e.target.value)} />
          <DropdownWithDelete mainArr={currentRequestData?.approvers} title='Согласующие лица' forMain />
        </ContentWrapper>
      </Sidebar>
    )
  );
};

export default SidebarWithSettings;
