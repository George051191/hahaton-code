/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React from 'react';
import styled from 'styled-components';
import { ClearPlusIcon, PencilIcon, GarbageIcon } from './icons';
import { Dropdown } from './inputs';

const Layout = styled.section`
          display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    display: flex;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
`;
const TableHeaderItem = styled.li`
    color:${({ theme: { headerH1 } }) => headerH1};
    margin-left: 100px;
    background: #F3F5F9;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 100px);
    background-color: rgba(243, 245, 249, 1);
`;
const Input = styled.input`
    background-color: transparent;
    width: 80px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: #000000;
`;

const Contributors = styled.ul`
    position: relative;
    background-color: transparent;
`;

const AddButton = styled.button`
    cursor: pointer;
    position: absolute;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #DDE2EA;
    border-radius: 48px;
`;

const IconContainer = styled.div`
    display: flex;
    gap: 5px;
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

const Constructor: FC = () => {
    const actions = ['Звонок', 'Письмо'];
    const templates = ['Стартовое', 'Анкетирование'];
    return (
        <Layout>
            <SectionTitle>Этапы согласования кандидатов</SectionTitle>
            <TableHeader>
                <TableHeaderItem>Участники</TableHeaderItem>
                <TableHeaderItem>Действие</TableHeaderItem>
                <TableHeaderItem>Шаблон</TableHeaderItem>
            </TableHeader>
            <Grid>
                <Input />
                <Contributors>
                    <AddButton><ClearPlusIcon /></AddButton>
                </Contributors>
                <Dropdown with items={actions} />
                <Dropdown items={templates} />
                <IconContainer>
                    <IconWrapper stats="blue">
                        <PencilIcon />
                    </IconWrapper>
                    <IconWrapper stats="red">
                        <GarbageIcon />
                    </IconWrapper>
                </IconContainer>
            </Grid>
        </Layout>
    );
};

export default Constructor;
