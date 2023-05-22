/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { LinkIcon, EditVacancyIcon } from './icons';

const Wrapper = styled.div`
    max-width: 1000px;
    width: 100%;
    height: 72px;
    display: flex;
    border-bottom: 1px solid rgba(0, 57, 145, 0.1);
    border-top: 1px solid rgba(0, 57, 145, 0.1);
    align-items: center;
    gap: 10px;
`;

const IconWrapper = styled.div`
    width: 15px;
    height: 15px;
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
const enum StatusEnum {
  send = 'send',
  cancel = 'cancel',
  agreed = 'agreed',
  inprocess = 'inprocess',
}

const VacancyStatus = styled.div<{ status: string }>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 5px;
    gap: 10px;
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

const CloseButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 14px;
    gap: 4px;
  
    width: 88px;
    height: 33px;
    background: rgba(25, 59, 103, 0.05);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme: { secondaryButtonsColor } }) => secondaryButtonsColor};
    cursor: pointer;
    border: none;
    outline: none;
`;

const RequestVacancyPlate: FC = () => {
  /// / from backend
  const namesArray = ['Георгий Александрович', 'Гevorg Александрович', 'Георгий Александрович', 'Гevorg Александрович', 'Георгий Александрович', 'Гevorg Александрович'];
  const stats = 'agreed';
  const getNumberOfRest = (index: number, array: string[]) => {
    if (index === 4) {
      return `+${array.length - 4}`;
    }
    const Tab = array[index].indexOf(' ');
    return array[index][0] + array[index][Tab + 1];
  };
  return (
    <Wrapper>
      <VacancCell>
        <Vacancy>Секретарь главного директора</Vacancy>
        <Span>14.07.2023</Span>
      </VacancCell>
      <List>
        {namesArray.slice(0, 5).map((el, index) => (
          <ListItem
            key={el}
            pos={index}>
            {getNumberOfRest(index, namesArray)}
          </ListItem>
        ))}
      </List>
      <List>
        {namesArray.slice(0, 5).map((el, index) => (
          <ListItem
            key={el}
            pos={index}>
            {getNumberOfRest(index, namesArray)}
          </ListItem>
        ))}
      </List>
      <Span>1</Span>
      <Span>45000</Span>
      <VacancyStatus status={stats}>
        {stats === StatusEnum.agreed ? 'Согласована' : stats === StatusEnum.cancel ? 'Отклонена' : stats === StatusEnum.send ? 'Отправлена' : 'На согласование'}
      </VacancyStatus>
      <IconWrapper>
        <LinkIcon />
      </IconWrapper>

      <IconWrapper>
        <EditVacancyIcon />
      </IconWrapper>
      <CloseButton>Закрыть</CloseButton>
    </Wrapper>
  );
};

export default RequestVacancyPlate;
