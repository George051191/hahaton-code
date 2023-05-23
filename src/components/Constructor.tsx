/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
    ClearPlusIcon, PencilIcon, GarbageIcon, ThreeIcon,
} from './icons';
import { Dropdown } from './inputs';
import { TConstructor } from '../types/components-types';
import { getNumberOfRest } from '../services/constants/utils';

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
    right: -126px;

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

const Constructor: FC<TConstructor> = ({ levelsArray, approvers }) => {
    const [isOpen, open] = useState(false);
    const [approveArr, pushToArr] = useState([]);
    const actions = ['Звонок', 'Письмо', 'Письмо с датой'];
    const templates = ['Стартовое', 'Анкетирование', 'Певичное инет..', 'Оффер', 'ОнБординг', 'Отказ'];
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
            {levelsArray.map((el) => (
                <Grid border={el.border} bgColor={el.bgColor}>
                    <Input>
                        <ThreeIcon />
                        {el.title}

                    </Input>
                    <Contributors>
                        {approveArr.slice(0, 5).map((item, index) => (
                            <ListItem
                                key={item}
                                pos={index}>
                                {getNumberOfRest(index, approveArr)}
                            </ListItem>
                        ))}
                        <AddButton onClick={() => open(!isOpen)}>
                            <ClearPlusIcon />
                        </AddButton>
                        {isOpen && (
                            <CoardinatngsList>
                                {approvers.map((elem) => (
                                    <CoardinatingsListItem onClick={() => pushToArr([...approveArr, elem])}>{elem}</CoardinatingsListItem>
                                ))}
                            </CoardinatngsList>
                        )}
                    </Contributors>
                    <DropdownWrapper>
                        <Dropdown withTitle={false} items={actions} />
                    </DropdownWrapper>
                    <DropdownWrapper>
                        <Dropdown withTitle={false} items={templates} />
                    </DropdownWrapper>

                    <IconContainer>
                        <IconWrapper stats='blue'>
                            <PencilIcon />
                        </IconWrapper>
                        <IconWrapper stats='red'>
                            <GarbageIcon />
                        </IconWrapper>
                    </IconContainer>
                </Grid>

            ))}
        </Layout>
    );
};

export default Constructor;
