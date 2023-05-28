/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable default-case */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicInput, InputWithSelect, TextArea } from './inputs';
import RequestVacancyPlate from './RequestVacancyPlate';
import { StatusEnum } from '../types/components-types';
import { useDispatch, useSelector } from '../store/store.type';
import getAllRequestsThunk from '../thunks/get-request-thunk';
import { setCurrentRequesrArray } from '../store/vacancyRequestsSlice';
import { TVacancyRequest } from '../types/apiTypes';

const Layout = styled.section`
        margin-left: 294px;
        margin-top: 80px;
    height: 100%;
    
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
   gap: 32px;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`;
const MainCell = styled.li`
    max-width: 225px;
    width: 100%;
    font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${({ theme: { headerH1 } }) => headerH1};
`;
const Cell = styled.li`
     font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 16px;
width: 103px;
color: ${({ theme: { headerH1 } }) => headerH1};
`;
const FilterButtonsShell = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const FilterButton = styled.button<{ status: StatusEnum }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 14px;
    gap: 4px;
  

    background-color: ${({ status }) => (status === StatusEnum.send
    ? 'rgba(244, 244, 244, 1)'
    : status === StatusEnum.cancel ? 'rgba(255, 239, 240, 1)'
      : status === StatusEnum.agreed ? 'rgba(240, 255, 246, 1)'
        : 'rgba(232, 245, 255, 1)')
};
    color: ${({ status }) => (status === StatusEnum.send
    ? 'rgba(28, 28, 28, 1)'
    : status === StatusEnum.cancel ? 'rgba(255, 78, 88, 1)'
      : status === StatusEnum.agreed ? 'rgba(53, 160, 96, 1)'
        : 'rgba(0, 56, 154, 1)')

};  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    
    cursor: pointer;
    border: none;
    outline: none;
`;

const LayoutForVacanciesRequests: FC<{ title: string }> = ({ title }) => {
  const dispatch = useDispatch();

  const { allVacanciesRequests, currentVacanciesRequest } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(getAllRequestsThunk());
  }, [dispatch]);
  const switchStatus = (status: number) => {
    switch (status) {
      case 4: {
        return StatusEnum.inprocess;
      }
      case 3: {
        return StatusEnum.cancel;
      }
      case 1: {
        return StatusEnum.send;
      }
      case 2: {
        return StatusEnum.agreed;
      }
      default: { return StatusEnum.send; }
    }
  };
  const filterRequests = (status: StatusEnum) => {
    const newArr = allVacanciesRequests?.filter((item) => switchStatus(item.status) === status);
    dispatch(setCurrentRequesrArray(newArr!));
  };
  return (
    <Layout>
      <SectionTitle>{title}</SectionTitle>
      <FilterButtonsShell>
        <FilterButton onClick={() => dispatch(setCurrentRequesrArray(allVacanciesRequests as TVacancyRequest[]))} status={StatusEnum.inprocess}>Все</FilterButton>
        <FilterButton onClick={() => filterRequests(StatusEnum.agreed)} status={StatusEnum.agreed}>Согласовано</FilterButton>
        <FilterButton onClick={() => filterRequests(StatusEnum.cancel)} status={StatusEnum.cancel}>Отменены</FilterButton>
        <FilterButton onClick={() => filterRequests(StatusEnum.send)} status={StatusEnum.send}>Отправлены</FilterButton>
      </FilterButtonsShell>
      <TableHeader>
        <MainCell>Должность</MainCell>
        <Cell style={{ marginLeft: '-19px' }}>Подразделение</Cell>
        <Cell style={{ marginLeft: '18px' }}>Согласующие</Cell>
        <Cell style={{ marginLeft: '16px' }}>Кол-во позиций</Cell>
        <Cell style={{ marginLeft: '-48px' }}>Зарплата (рубли)</Cell>
        <Cell style={{ marginLeft: '-5px' }}>Статус</Cell>
        <Cell>Вакансия</Cell>

      </TableHeader>
      {currentVacanciesRequest?.map((item) => (
        <RequestVacancyPlate
          title={item.positionName}
          salary={item.salary as number}
          amount={item.positionCount as number}
          divisions={item.departments}
          coordinators={item.approvers}
          stats={switchStatus(item.status)}
          date={new Date(item.deadline).toLocaleDateString()}
          id={item.id}
          forVacancy={false} />
      ))}

    </Layout>
  );
};

export default LayoutForVacanciesRequests;
