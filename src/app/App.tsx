/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from '../store/store.type';
import Sidebar from '../components/SideBar';
import BasicLayout from '../components/BasicLayout';
import { linksArray } from '../services/constants/utils';
import LayoutForCreateVacancy from '../components/LayoutForCreateVacancy';
import LayoutForVacanciesRequests from '../components/LayoutForVacanciesRequests';
import PublishingLayout from '../components/PublishingLayout';
import getAllThunk from '../thunks/get-user-and-departments-thunk';
import getAllRequestsThunk from '../thunks/get-request-thunk';

const MainLayout = styled.main`
  width: 100%;
  height: 100vh;
  font-family: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
  background-color:  ${({ theme: { bgColor } }) => bgColor};
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllThunk());
    dispatch(getAllRequestsThunk())
  }, [dispatch]);
  return (
    <MainLayout>
      <Sidebar linksArray={linksArray} />
      <Routes>
        <Route path='/vacancies' element={<BasicLayout title='Вакансии' />} />
        <Route path='/candidats' element={<BasicLayout title='Кандидаты' />} />
        <Route path='/structure' element={<BasicLayout title='Структура' />} />

        <Route path='/create' element={<LayoutForCreateVacancy />} />
        <Route path='/analitics' element={<LayoutForVacanciesRequests title='Заявки на вакансию' />} />
        <Route path='/publish' element={<PublishingLayout />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
