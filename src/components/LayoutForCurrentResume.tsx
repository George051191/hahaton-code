/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from '../store/store.type';
import { BasicInput, Dropdown, TextArea } from './inputs';
import getVacancyThunk from '../thunks/get-vacancy-with-id';

const Layout = styled.section`
    margin-left: 218px;
    margin-top: 10px;
    height: 100%;
    position: relative;
    display: flex;
   
 `;

const ResumeColumn = styled.ul`
    display: flex;
    flex-direction: column;
    max-width: 260px;
    width: 100%;
    height: 100vh;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 210px;
`;

const CurrentResumeColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    & textarea {
      width: 610px;
    min-height: 225px;
    }
`;
const NavBar = styled.div`
    display:flex ;
    align-items: center;
    gap: 20px;
    margin-left: 10px;
`;

const Reserv = styled.button`
  display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 14px;
cursor: pointer;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;

width: 93px;
height: 33px;
border: none;
outline: none;
color: #FFFFFF;


background: #FF4E58;
`;

const Reserv1 = styled.button`
    display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 14px;
cursor: pointer;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;

width: 93px;
height: 33px;
border: none;
outline: none;
color: #FFFFFF;


background:rgba(0, 56, 154, 1);
`;

const ColumnItem = styled.li`
    display: flex;
    height: 56px;
  
    align-items: center;
    border: 1px solid #D6EDFF;
    :hover {
        border: 1px solid rgba(0, 95, 219, 1);
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    margin-left: 5px;
    flex: auto;
`;
const Header = styled.p`
    font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 120%;
margin: 0;

color: #008FFA;

`;

const Span = styled.span`
    font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 122%;



color: #A5A5A5;
`;

const Status = styled.div`
    width: 43px;
    height: 43px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #008FFA;
`;
const Header1 = styled.h2`
  font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 125%;
/* identical to box height, or 20px */


/* Text/Text Reg */

color: #1C1C1C;
`;

const ColumnItem1 = styled.div`
  width: 500px;
  display: flex;
    height: 56px;
  border: none;
    align-items: center;

`;

const LayoutForCurrentResume: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allResumes, currentIdVacancy } = useSelector((state) => state.resume);
  const { currentVacancy } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(getVacancyThunk(+location.pathname.slice(16)));
  }, [dispatch]);
  return (
    <Layout>

      <ResumeColumn>
        <p>
          {' '}
          {currentVacancy}
        </p>
        {allResumes?.filter((el) => el.id === +location.pathname.slice(16)).map((el) => (

          <ColumnItem>

            <Wrapper>

              <Header>{el.name}</Header>
              <Span>{el.city}</Span>
            </Wrapper>
            <Status>{`${el.rating}%`}</Status>
          </ColumnItem>
        ))}
        <Dropdown withTitle value='Новый' items={['Новый', 'Анкетирование', 'Интервью с HR', 'Интервью с заказчиком', 'Интервью с заказчиком', 'Оффер', 'Вышел на работу', 'Отказ']} />
      </ResumeColumn>

      <CurrentResumeColumn>
        <NavBar>
          {allResumes?.filter((el) => el.id === +location.pathname.slice(16)).map((el) => (
            <>
              <ColumnItem1>
                <Wrapper>

                  <Header1>{el.name}</Header1>
                  <Span>{el.city}</Span>
                </Wrapper>
                <Status>{`${el.rating}%`}</Status>
              </ColumnItem1>
              <Reserv>Отказ</Reserv>
              <Reserv1 onClick={() => navigate('/vacancies')}>Выйти</Reserv1>
            </>
          ))}
        </NavBar>

        <TextArea value={`Мужчина, 28 лет, родился 9 октября 1995
Москва, готова к переезду (Санкт-Петербург), не готов к командировкам
Разработчик
50 000 руб. на руки
Специализации:
Программист, разработчик
Занятость: полная занятость, работа из дома
График работы: полный день
 `} />
        <TextArea value='Фундаментальная математическая подготовка,Языки программирования: С, С++, Pascal, Assembler, Scheme;библиотеки:STL;Среды программирования: MS Visual Studio (6.0, .Net, 2005);CASE-средства: IBM Rationa Tau, Rational Rose, Borland Together Architect, Microsoft Visio;Язык визуального моделирования: UML;Базовые знания: Средство управления требованиями Telelogic DOORs, алгоритмы работы с графами, SQL (начальный уровень).Понимание концепций ООП и шаблонов проектирования.Личные качества:Быстрое и самостоятельное освоение новой информации.Умение работать на результат, принимать решения и нести за них ответственность.Желание постоянно повышать свой профессиональный уровень, аналитический склад ума.Хорошие коммуникативные навыки, стрессоустойчивость.' />

      </CurrentResumeColumn>

    </Layout>
  );
};

export default LayoutForCurrentResume;
