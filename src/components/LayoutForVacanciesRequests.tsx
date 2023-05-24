/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BasicInput, InputWithSelect, TextArea } from './inputs';
import RequestVacancyPlate from './RequestVacancyPlate';
import { StatusEnum } from '../types/components-types';

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

const LayoutForVacanciesRequests: FC<{ title: string }> = ({ title }) => (
  <Layout>
    <SectionTitle>{title}</SectionTitle>
    <FilterButtonsShell>
      <FilterButton status={StatusEnum.inprocess}>Все</FilterButton>
      <FilterButton status={StatusEnum.agreed}>Согласовано</FilterButton>
      <FilterButton status={StatusEnum.cancel}>Отменены</FilterButton>

      <FilterButton status={StatusEnum.send}>Отправлены</FilterButton>
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
    <RequestVacancyPlate
      title='Помощник бухгалтера'
      salary={20000}
      amount={5}
      divisions={['Помощники']}
      coordinators={['Георгий Александрович', 'Гevorg Александрович', 'Георгий Александрович', 'Гevorg Александрович', 'Георгий Александрович', 'Гevorg Александрович']}
      stats={StatusEnum.agreed}
      date='11/05/2023' />
    <RequestVacancyPlate
      title='Помощник бухгалтера'
      salary={20000}
      amount={5}
      divisions={['Помощники']}
      coordinators={['Георгий Александрович', 'Гevorg Александрович', 'Георгий Александрович', 'Гevorg Александрович', 'Георгий Александрович', 'Гevorg Александрович']}
      stats={StatusEnum.cancel}
      date='11/05/2023' />
    <RequestVacancyPlate
      title='Помощник бухгалтера'
      salary={20000}
      amount={5}
      divisions={['Помощники']}
      coordinators={['Георгий Александрович', 'Гevorg Александрович', 'Георгий Александрович', 'Гevorg Александрович', 'Георгий Александрович', 'Гevorg Александрович']}
      stats={StatusEnum.inprocess}
      date='11/05/2023' />

  </Layout>
);

export default LayoutForVacanciesRequests;
