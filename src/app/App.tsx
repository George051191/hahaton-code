/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/SideBar';
import BasicLayout from '../components/BasicLayout';
import { linksArray } from '../services/constants/utils';

const MainLayout = styled.main`
  width: 100%;
  height: 100vh;
  font-family: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
  background-color:  ${({ theme: { bgColor } }) => bgColor};
`;

const App = () => (
  <MainLayout>
    <Sidebar linksArray={linksArray} />
    <Routes>
      <Route path='/vacancies' element={<BasicLayout />} />
    </Routes>
  </MainLayout>

);

export default App;
