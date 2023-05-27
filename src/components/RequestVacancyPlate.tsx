/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { LinkIcon, EditVacancyIcon, GarbageIcon } from './icons';
import { TRequestVacancyPlate, StatusEnum } from '../types/components-types';
import { getNumberOfRest } from '../services/constants/utils';
import deleteRequestItemThunk from '../thunks/delete-requets-thunk';
import { useDispatch } from '../store/store.type';
import getCurrentRequestsThunk from '../thunks/get-current-request-thunk';
import { setId } from '../store/vacancyRequestsSlice';
const Wrapper = styled.div`
    max-width: 1025px;
    width: 100%;
    min-height: 72px;
    display: flex;
    border-bottom: 1px solid rgba(0, 57, 145, 0.1);
    border-top: 1px solid rgba(0, 57, 145, 0.1);
    align-items: center;
    gap: 10px;
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

const VacancCell = styled.div`
    max-width: 225px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Vacancy = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    color:${({ theme: { actionButtonsColor } }) => actionButtonsColor};
`;

const Span = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #1C1C1C;
    max-width: 80px;
    width: 100%;

`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    max-width: 145px;
    width: 100%;
    margin-bottom: 5px;
    
`;

const VacancyStatus = styled.div<{ status: StatusEnum }>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 5px;
    gap: 10px;
    font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 134%;
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
    width: 127px;

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

const PublishButton = styled.button`
  display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 14px;
gap: 4px;
border: none;
outline: none;
margin-top: 5px;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
display: flex;
align-items: center;
text-align: center;
color: ${({ theme: { bgColor } }) => bgColor};
width: 198px;
height: 33px;
background:${({ theme: { mainButtonsColor } }) => mainButtonsColor};
cursor: pointer;
`;

const RequestVacancyPlate: FC<TRequestVacancyPlate> = ({
  title, salary, amount, coordinators, divisions, stats, date, id, forVacancy,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <VacancCell>
        <Vacancy>{title}</Vacancy>
        <Span>{date}</Span>
        {stats === StatusEnum.agreed && <PublishButton onClick={() => { console.log(id); setId(id); dispatch(getCurrentRequestsThunk(id)); navigate(`/publish/${id}`) }}>Опубликовать вакансию</PublishButton>}
      </VacancCell>
      <List>
        {divisions?.slice(0, 5).map((el, index) => (
          <ListItem
            key={el.id}
            pos={index}>
            {getNumberOfRest(index, divisions)}
          </ListItem>
        ))}
      </List>
      <List>
        {coordinators?.slice(0, 5).map((el, index) => (
          <ListItem
            key={el.id}
            pos={index}>
            {getNumberOfRest(index, coordinators)}
          </ListItem>
        ))}
      </List>
      <Span>{amount}</Span>
      <Span>{salary}</Span>
      {!forVacancy && <VacancyStatus status={stats}>
        {stats === StatusEnum.agreed ? 'Согласована' : stats === StatusEnum.cancel ? 'Отклонена' : stats === StatusEnum.send ? 'Отправлена' : 'На согласование'}
      </VacancyStatus>}
      {forVacancy && <VacancyStatus status={stats}>
        {stats === StatusEnum.agreed ? 'В работе' : stats === StatusEnum.cancel ? 'Закрыта' : stats === StatusEnum.send ? 'Черновик' : 'На согласование'}
      </VacancyStatus>}
      <IconWrapper stats='grey'>
        <LinkIcon />
      </IconWrapper>

      <IconWrapper stats='blue'>
        <EditVacancyIcon />
      </IconWrapper>
      <IconWrapper stats='red'>
        <GarbageIcon onClick={() => dispatch(deleteRequestItemThunk(id))} />
      </IconWrapper>
    </Wrapper>
  );
};

export default RequestVacancyPlate;
