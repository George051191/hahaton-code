/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC } from 'react';
import styled from 'styled-components';

const Plate = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: ${({ theme: { bgColor } }) => bgColor};
    position: absolute;
    width: 100%;
    top: 44px;
    align-items: flex-start;
   
    padding: 10px;
    box-sizing: border-box;
`;
const UserName = styled.p`
    font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 120%;
color: #1C1C1C;
margin: 0;
text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;

`;

const NameSpan = styled.span`
    font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
color: #838A9D;
`;

const NamePlate: FC<{ name: string, role: string }> = ({ name, role }) => (
    <Plate>
        <UserName>{name}</UserName>
        <NameSpan>{role}</NameSpan>
    </Plate>
);

export default NamePlate;
