/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/SideBar';
import BasicLayout from '../components/BasicLayout';
import { linksArray } from '../services/constants/utils';
import LayoutForCreateVacancy from '../components/LayoutForCreateVacancy';
import LayoutForVacanciesRequests from '../components/LayoutForVacanciesRequests';
import PublishingLayout from '../components/PublishingLayout';

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
      <Route path='/vacancies' element={<BasicLayout title='Вакансии' />} />
      <Route path='/candidats' element={<BasicLayout title='Кандидаты' />} />
      <Route path='/structure' element={<BasicLayout title='Структура' />} />
      <Route path='/analitics' element={<BasicLayout title='Аналитика' />} />
      <Route path='/create' element={<LayoutForCreateVacancy />} />
      <Route path='/requests' element={<LayoutForVacanciesRequests title='Заявки на вакансию' />} />
      <Route path='/publish' element={<PublishingLayout />} />
    </Routes>
  </MainLayout>

);

export default App;
