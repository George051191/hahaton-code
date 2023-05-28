/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../store/store.type';
import Sidebar from '../components/SideBar';
import LayoutForCurrentResume from '../components/LayoutForCurrentResume';
import { linksArray } from '../services/constants/utils';
import LayoutForCreateVacancy from '../components/LayoutForCreateVacancy';
import LayoutForVacanciesRequests from '../components/LayoutForVacanciesRequests';
import PublishingLayout from '../components/PublishingLayout';
import getAllThunk from '../thunks/get-user-and-departments-thunk';
import getAllRequestsThunk from '../thunks/get-request-thunk';
import Modal from '../components/Modal';
import { openStagePopup, openCanbanPopup } from '../store/userAndOrganizationSlice';
import VacancyLayout from '../components/VacanciesLayout';
import ModalForCanban from '../components/ModalForCanban';
import DragAndDrop from '../components/Canban/Candidats';
import getAndSetDataToStandart from '../thunks/map-whole-data-thunk';

const MainLayout = styled.main`
  width: 100%;
  height: 100vh;
  font-family: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
  background-color:  ${({ theme: { bgColor } }) => bgColor};
`;

const MainViewHeader = styled.h2`
  font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 125%;
position: absolute;
margin: 0;

text-align: center;

left: 56%;
    text-align: center;
    color: rgb(0, 57, 145);
    top: 50%;
    transform: translate(-50%, -50%);


`;

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { stagePopupOpen, canbanOpen } = useSelector((state) => state.allBaseData);
  useEffect(() => {
    dispatch(getAndSetDataToStandart(+(location.pathname.slice(11))));
    dispatch(getAllThunk());
    dispatch(getAllRequestsThunk());
  }, [dispatch]);
  return (
    <MainLayout>
      {location.pathname === '/' && <MainViewHeader>Добро пожаловать в систему!Нажмите кнопку 'Добавить' для начала работы </MainViewHeader>}
      {location.pathname !== '/candidats' && <Sidebar linksArray={linksArray} />}
      <Routes>
        <Route path='/vacancies' element={<VacancyLayout title='Вакансии' />} />
        <Route path='/candidats/:id' element={<DragAndDrop />} />
        <Route path='/candidats/page/:id' element={<LayoutForCurrentResume />} />
        <Route path='/create' element={<LayoutForCreateVacancy />} />
        <Route path='/analitics' element={<LayoutForVacanciesRequests title='Заявки на вакансию' />} />
        <Route path='/publish/:id' element={<PublishingLayout />} />
      </Routes>
      {stagePopupOpen && <Modal onClose={() => dispatch(openStagePopup(false))} />}
      {canbanOpen && <ModalForCanban onClose={() => dispatch(openCanbanPopup(false))} />}
    </MainLayout>
  );
};

export default App;
