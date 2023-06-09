/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TSidebar } from '../types/components-types';
import {
  BagIcon, ProfileIcon, EditIcon, ChartIcon, StructureIcon,
} from './icons';
import NamePlate from './UserPlate';
import Logo from '../assets/images/Logo.png';
import { tabletBreakpoint } from '../services/constants/screen-sizes';
import { useSelector } from '../store/store.type';

const SidebarNav = styled.aside`
    position: fixed;
    left: 0;
    top: 0;
    background-color: ${({ theme: { sidebarColor } }) => sidebarColor};
    width: 283px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding-top: 50px;
    z-index: 9999999;
    transition: all ease .4s;
    @media screen and (max-width: ${tabletBreakpoint}px ) {
        left: -222px;
    }
`;

const SidebarItemsList = styled.nav`
    display: flex;
    flex: auto;
    padding-top: 100px;
    flex-direction: column;
    gap: 354px;
    align-items: center;
    @media screen and (max-height: 785px) {
      gap: 200px;
    }
    @media screen and (max-height: 680px) {
      gap: 50px;
    }
`;
const SideBarList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding:0;
    flex-direction: column;
    gap: 30px;
`;

const SideBarItem = styled.li`
    padding: 0;
    display: flex;
    gap: 25px;
    cursor: pointer;
    align-items: center;
    
`;

const ItemName = styled.p<{ isActive: boolean }>`
    font-family: 'Inter';
    font-style: normal;
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    font-size: 14px;
    margin: 0;
    line-height: 120%;
    color: ${({ isActive, theme: { navItemsColor, mainButtonsColor } }) => (isActive ? mainButtonsColor : navItemsColor)};
`;
const LogoMain = styled.img`
    width: 150px;
    height: 20px;
    cursor: pointer;
 `;

const AddButton = styled.button`
  width: 150px;
  height: 33px;
  display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 14px;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
background-color: ${({ theme: { mainButtonsColor } }) => mainButtonsColor};
color: ${({ theme: { bgColor } }) => bgColor};
cursor: pointer;
border: none;
outline: none;
position: relative;
`;

const Sidebar: FC<TSidebar> = ({ linksArray }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.allBaseData);
  const navigate = useNavigate();
  return (
    <SidebarNav>
      <LogoMain onClick={() => navigate('/')} src={Logo} />

      <SidebarItemsList>
        <SideBarList>
          {linksArray.map((el) => (
            <SideBarItem key={el.title} onClick={() => { if (el.title === 'Кандидаты(в разработке)' || el.title === 'Орг. структура(в разработке)' || el.title === 'Настройки(в разработке)') { return; } navigate(el.path); }}>
              <el.icon isActive={location.pathname === el.urlName} />
              <ItemName isActive={location.pathname === el.urlName}>{el.title}</ItemName>
            </SideBarItem>
          ))}
        </SideBarList>
        <AddButton onClick={() => navigate('/create')}>
          + Добавить
          <NamePlate name={currentUser?.name as string} role={currentUser?.role as string} />
        </AddButton>

      </SidebarItemsList>

    </SidebarNav>
  );
};

export default Sidebar;
