/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BasicInput, InputWithSelect, TextArea } from './inputs';

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

const BasicLayout: FC<{ title: string }> = ({ title }) => {
  const [division, setDivision] = useState<string[]>([]);
  const [isDivisionOpen, openDivisions] = useState(false);

  /// с сервера приходят имена сотрудников и названия подразделений
  const dataArray = ['Георгий Александрович', 'Гevorg Александрович'];

  const checkStatus = (e: any) => {
    if (division.includes(e.target.value)) {
      return;
    }
    setDivision([...division, e.target.value]);
  };

  const deleteItem = (item: string) => {
    const arr = division.filter((el) => el !== item);
    setDivision(arr);
  };

  return (
    <Layout>
      <SectionTitle>{title}</SectionTitle>

    </Layout>
  );
};

export default BasicLayout;
