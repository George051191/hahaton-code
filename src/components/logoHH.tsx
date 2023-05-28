/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC } from 'react';
import styled from 'styled-components';
import hh from '../assets/images/hh.png';
import job from '../assets/images/job.png';
import work from '../assets/images/work.png';

const SectionTitle = styled.h1`
    font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 125%;
margin: 0;
align-self: normal;
color: ${({ theme: { headerH1 } }) => headerH1};
 `;

const LogoBox = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 40px;
    justify-content: center;
 `;

const Logo = styled.div`
width: 358px;
height: 131px;
display: flex;
align-items: center;
justify-content: center;
border: 1px solid #E1E1E1;
 `;

const Image = styled.img`
    width: 102px;
height: 57px;
 `;

const LogoHH: FC<{ onClick: (el: string) => void }> = ({ onClick }) => (
  <>
    <SectionTitle>Где опубликовать</SectionTitle>
    <LogoBox>
      <Logo onClick={() => onClick('HH')}><Image src={hh} /></Logo>
      <Logo onClick={() => onClick('superjob')}><Image src={job} /></Logo>
      <Logo onClick={() => onClick('rabota.ru')}><Image src={work} /></Logo>
      <Logo onClick={() => onClick('HH')}><Image src={job} /></Logo>
    </LogoBox>
  </>
);

export default LogoHH;
