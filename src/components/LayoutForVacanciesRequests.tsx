/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BasicInput, InputWithSelect, TextArea } from './inputs';
import RequestVacancyPlate from './RequestVacancyPlate';

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

const LayoutForVacanciesRequests: FC<{ title: string }> = ({ title }) => {


    return (
        <Layout>
            <SectionTitle>{title}</SectionTitle>
            <RequestVacancyPlate />
        </Layout>
    );
};

export default LayoutForVacanciesRequests;