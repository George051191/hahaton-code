/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
    DropdownWithDelete, InputWithDate, InputForPositionSelect, BasicInput,
} from './inputs';

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

const SidebarWithSettings: FC = () => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState(0);
    const [salaryValue, setValue] = useState();
    const onDecrease = () => {
        if (amount === 0) { return; }
        setAmount(amount - 1);
    };

    const onIncrease = () => {
        setAmount(amount + 1);
    };

    return (
        <Sidebar>
            <ContentWrapper>
                <DropdownWithDelete approversArr={['GOga Giga', 'Jajd fhrhhr']} title='Ответственные сотрудники ' forAprove />
                <InputWithDate title='Дата закрытия вакансии' value={date} onClick={(e) => setDate(e.target.value)} />
                <DropdownWithDelete divisionArr={['GOga Giga', 'Jajd fhrhhr']} title='Подразделение' forDivision />
                <DropdownWithDelete clientArr={['GOga Giga', 'Jajd fhrhhr']} title='Заказчик' forClient />
                <InputForPositionSelect value={amount} onDecrease={onDecrease} onIncrease={onIncrease} title='Количество позиций' />
                <BasicInput type='number' name='salary' salary title='Зарплата' value={salaryValue} onChange={(e) => setValue(e.target.value)} />
                <DropdownWithDelete mainArr={['GOga Giga', 'Jajd fhrhhr']} title='Согласующие лица' forMain />
            </ContentWrapper>
        </Sidebar>
    );
};

export default SidebarWithSettings;
