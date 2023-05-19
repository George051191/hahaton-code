/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC } from 'react';
import styled from 'styled-components';

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

const BasicLayout: FC<{ title: string }> = ({ title }) => (
    <Layout>
        <SectionTitle>{title}</SectionTitle>
    </Layout>
);

export default BasicLayout;
