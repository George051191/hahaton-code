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
import { setCurrentRequesrArray, setCurrentVacancyArray } from '../store/vacancyRequestsSlice';
import { TVacancy } from '../types/apiTypes';
import getAllVacanciesThunk from '../thunks/get-vacansies-thunk';
import VacancyPlate from './VacancyPlate';
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

const VacancyLayout: FC<{ title: string }> = ({ title }) => {
    const dispatch = useDispatch();

    const { vacansies } = useSelector((state) => state.request);
    const vacan = [{
        id: 1,
        name: 'her man',
        approvers: [{ id: 1, name: 'her  man', shortName: 'her' }],
        responseMan: { id: 1, name: 'her  man', shortName: 'her' },
        positionAmount: 5,
        salary: 500000,
        status: 'inWork',
        dateOfExpire: '5-10-2025',
        daysInProgressStatus: 5,
        candidats: 8,
    }];
    useEffect(() => {
        dispatch(getAllVacanciesThunk());
    }, [dispatch]);
    /// 'inWork' | 'draft' | 'close'
    const switchStatus = (status: string) => {
        switch (status) {
            case 'inWork': {
                return StatusEnum.agreed;
            }
            case 'draft': {
                return StatusEnum.send;
            }
            case 'close': {
                return StatusEnum.cancel;
            }

            default: { return StatusEnum.send; }
        }
    };
    const filterRequests = (status: StatusEnum) => {
        const newArr = vacan?.filter((item) => switchStatus(item.status) === status);
        dispatch(setCurrentVacancyArray(newArr));
    };
    return (
        <Layout>
            <SectionTitle>{title}</SectionTitle>
            <FilterButtonsShell>
                <FilterButton onClick={() => dispatch(setCurrentVacancyArray(vacan))} status={StatusEnum.inprocess}>Все</FilterButton>
                <FilterButton onClick={() => filterRequests(StatusEnum.agreed)} status={StatusEnum.agreed}>В работе</FilterButton>
                <FilterButton onClick={() => filterRequests(StatusEnum.cancel)} status={StatusEnum.cancel}>Закрыта</FilterButton>
                <FilterButton onClick={() => filterRequests(StatusEnum.send)} status={StatusEnum.send}>Черновик</FilterButton>
            </FilterButtonsShell>
            <TableHeader>
                <MainCell>Название / Дата  и дни до закрытия</MainCell>
                <Cell style={{ marginLeft: '-19px' }}>Кандидаты</Cell>
                <Cell style={{ marginLeft: '-46px' }}>Согласующие</Cell>
                <Cell style={{ marginLeft: '18px' }}>Ответсвенный</Cell>
                <Cell style={{ marginLeft: '16px' }}>Кол-во позиций</Cell>
                <Cell style={{ marginLeft: '-48px' }}>Зарплата (рубли)</Cell>
                <Cell style={{ marginLeft: '-5px' }}>Статус</Cell>

            </TableHeader>
            {vacan?.map((item) => (
                <VacancyPlate
                    title={item.positionName}
                    salary={item.salary as number}
                    amount={item.positionAmount as number}
                    approvers={item.approvers}
                    responseMan={item.responseMan}
                    stats={switchStatus(item.status)}
                    dateOfExpire={item.dateOfExpire}
                    daysInProgressStatus={item.daysInProgressStatus}
                    candidats={item.candidats}
                    id={item.id}
                    forVacancy />
            ))}

        </Layout>
    );
};

export default VacancyLayout;
