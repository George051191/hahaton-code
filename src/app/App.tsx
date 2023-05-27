/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../store/store.type';
import Sidebar from '../components/SideBar';
import BasicLayout from '../components/BasicLayout';
import { linksArray } from '../services/constants/utils';
import LayoutForCreateVacancy from '../components/LayoutForCreateVacancy';
import LayoutForVacanciesRequests from '../components/LayoutForVacanciesRequests';
import PublishingLayout from '../components/PublishingLayout';
import getAllThunk from '../thunks/get-user-and-departments-thunk';
import getAllRequestsThunk from '../thunks/get-request-thunk';
import Modal from '../components/Modal';
import { openStagePopup } from '../store/userAndOrganizationSlice';
import VacancyLayout from '../components/VacanciesLayout';
import Candidats from '../components/Candidats';
import { useLocation } from 'react-router-dom';

const MainLayout = styled.main`
  width: 100%;
  height: 100vh;
  font-family: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
  background-color:  ${({ theme: { bgColor } }) => bgColor};
`;

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { stagePopupOpen } = useSelector((state) => state.allBaseData);
  useEffect(() => {
    dispatch(getAllThunk());
    dispatch(getAllRequestsThunk())
  }, [dispatch]);
  return (
    <MainLayout>
      {location.pathname !== '/candidats' && <Sidebar linksArray={linksArray} />}
      <Routes>
        <Route path='/vacancies' element={<VacancyLayout title='Вакансии' />} />
        <Route path='/candidats' element={<Candidats />} />
        <Route path='/structure' element={<BasicLayout title='Структура' />} />

        <Route path='/create' element={<LayoutForCreateVacancy />} />
        <Route path='/analitics' element={<LayoutForVacanciesRequests title='Заявки на вакансию' />} />
        <Route path='/publish/:id' element={<PublishingLayout />} />
      </Routes>
      {stagePopupOpen && <Modal onClose={() => dispatch(openStagePopup(false))} />}
    </MainLayout>
  );
};

export default App;
