/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import {
  BasicInput, InputWithSelect, Dropdown, TextArea, DropdownWithDelete,
} from './inputs';
import Constructor from './Constructor';
import Modal from './Modal';
import SidebarWithSettings from './SedebarWithSettings';
import { useDispatch, useSelector } from '../store/store.type';
import LogoHH from './logoHH';
import { setCurrentVacancy, setprePublishVacancy } from '../store/vacancyRequestsSlice';
import getCurrentRequestsThunk from '../thunks/get-current-request-thunk';
import getAllStagesThunk from '../thunks/get-stages-thunk';
import getStagesThunk from '../thunks/get-stages-for-vacancy-thunk';

const Layout = styled.section`
    margin-left: 294px;
    margin-top: 80px;
    margin-right: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    
 `;

const NavigateConatainer = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 213px;
    z-index: 200;
    width:100%;
    background-color: ${({ theme: { headerH1 } }) => headerH1};
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    height: 51px;
    justify-content: center;
`;
const ButtonContainer = styled.div`
   
    display: flex;
    position: relative;
    left: -107px;
`;

const NavigateButton = styled.button<{ isClicked: boolean }>`
    width: 100px;
    height: 100%;
    color:${({ isClicked }) => (isClicked ? 'rgba(0, 95, 219, 1)' : 'rgba(255, 255, 255, 1)')}  ;

    background-color: transparent;
    border: none;
    outline: none;
    position: relative;
    cursor: pointer;
`;

const BorderBox = styled.span<{ isClicked: boolean }>`
    position: absolute;
    bottom: 0;
    left: 50%;
    background-color:${({ isClicked }) => (isClicked ? 'rgba(0, 95, 219, 1)' : 'transparent')}  ;
    width: 30px;
    height: 4px;
    transform: translate(-50%);
`;
const FormContainer = styled.div`
    width: 100%;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Form = styled.form`
    display: flex;
    max-width: 665px;
    width: 100%;
   
    flex-direction: column;
    gap: 38px;
    position: relative;
`;

const BasicCheckBoxesConatiner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
const BoxesHeader = styled.h3`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    color: #000000;
    margin: 0;
`;
const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
const CheckBox = styled.input`
    
    :checked {
        background: #008FFA;
border-radius: 4px;
    }
  
`;
const InputTitle = styled.label`
    margin: 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: ${({ theme: { labelColor } }) => labelColor};
`;

const ChecksPanel = styled.div`
    display: flex;
    gap: 30px;
    flex-wrap: wrap;

`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 660px;
    gap: 26px;
    justify-content: center;
`;
const OptionButton = styled.button<{ direction: string }>`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    border: none;
    outline: none;
    display: flex;
    cursor: pointer;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
    width: 317px;
    height: 33px;
    background-color: ${({ direction, theme: { mainButtonsColor } }) => (direction === 'Back'
    ? 'rgba(25, 59, 103, 0.05)'
    : direction === 'Next'
      ? mainButtonsColor
      : direction === 'Cancel'
        ? '#FFFFFF'
        : 'rgba(227, 227, 227, 1)')};
    color: ${({ direction, theme: { mainButtonsColor, bgColor } }) => (direction === 'Back' || direction === 'Cancel'
    ? mainButtonsColor
    : direction === 'Next'
      ? bgColor : 'rgba(146, 146, 146, 1)')};        
`;

const PublishingLayout: FC = () => {
  const location = useLocation();
  const [stage, setStage] = useState<number>(1);
  const {
    currentRequestData, timer, currentRequestId, approveStages,
  } = useSelector((state) => state.request);
  const [formValues, setVolume] = useState<{ [key: string]: any }>({});
  const navigate = useNavigate();
  const [possValue, setPossValue] = useState('');
  const [requrementValue, setReqValue] = useState('');
  const [responsValue, setRespValue] = useState('');
  const [commentValue, setComments] = useState('');
  const [placeWork, setPlace] = useState('');
  const dispatch = useDispatch();
  const [date, setDate] = useState();

  const [amount, setAmount] = useState(0);
  const [salaryValue, setValue] = useState();
  const [publishRoute, setPublishRoute] = useState('');
  const arr = ['Главный офис', 'Офис на Красной 125', 'Офис город Москва'];

  const onDecrease = () => {
    if (amount === 0) { return; }
    setAmount(amount - 1);
    setVolume({
      ...formValues,
      positionCount: amount,
    });
  };
  const publishWhere = (el: string) => {
    setPublishRoute(el);
  };

  useEffect(() => {
    dispatch(getCurrentRequestsThunk(location.pathname.slice(9)));
    dispatch(getStagesThunk(location.pathname.slice(9)));
    // setPossValue(currentRequestData?.positionName);
    /* setReqValue(currentRequestData?.requirement);
    setRespValue(currentRequestData?.responsibilities);
    setComments(currentRequestData?.comments);
    setDate(currentRequestData?.deadline!);
    setAmount(currentRequestData?.positionCount!);
    setValue(`${currentRequestData?.salary!}`); */
  }, [dispatch]);

  const onIncrease = () => {
    setAmount(amount + 1);
    setVolume({
      ...formValues,
      positionCount: amount,
    });
  };

  const writeDate = (el: any) => {
    setDate(el);
    setVolume({
      ...formValues,
      deadline: el,
    });
  };

  const addToVacancy = (e: any) => {
    const { value, name } = e.target;

    setVolume({
      ...formValues,
      [name]: value,
    });
  };
  ///
  const addAndGo = () => {
    const bigBundleOfData = {
      positionName: possValue,
      positionCount: formValues.positionCount,
      experience: formValues.abilities,
      employmentFull: true,
      employmentPart: false,
      employmentProject: false,
      employmentVolunteering: false,
      employmentInternship: false,
      scheduleFull: true,
      scheduleShift: false,
      scheduleAgile: false,
      scheduleRemote: false,
      scheduleWatch: false,
      educationHigher: true,
      educationProfile: false,
      educationMiddle: false,
      contactVisible: true,
      placeOfWork: placeWork,
      responsibilities: responsValue,
      requirements: requrementValue,
      comments: commentValue,
      requestId: 0,
      deadline: formValues.deadline,
      salary: salaryValue,
      includeTaxes: true,
      visibility: true,
      responseMan: {
        id: 0, name: 'Георгий Александрович', shortName: 'Георгий', email: 'trubacheff_91@mail.ru',
      },
      departments: [{ id: 0, name: 'Отдел по...' }],
      customers: [{
        id: 0, name: 'Георгий Александрович', shortName: 'Георгий', email: 'trubacheff_91@mail.ru',
      }],
      approvers: [{
        id: 0, name: 'Георгий Александрович', shortName: 'Георгий', email: 'trubacheff_91@mail.ru',
      }, {
        id: 1, name: 'Георгий Вахидович', shortName: 'Георгий', email: 'trubkdmvf_91@mail.ru',
      }],
      publicationSources: [{ id: 0, name: publishRoute }],
      skills: formValues.abilities,
      stages: approveStages,
    };
    dispatch(setprePublishVacancy(bigBundleOfData));
    dispatch(setCurrentVacancy(possValue));
    navigate('/vacancies');
  };

  return (

    <Layout>
      {currentRequestData?.approvers && (
        <SidebarWithSettings
          date={date || currentRequestData?.deadline}
          setDate={writeDate}
          amount={amount || currentRequestData?.positionCount}
          setAmount={setAmount}
          salaryValue={salaryValue || currentRequestData?.salary}
          setValue={setValue}
          onDecrease={onDecrease}
          onIncrease={onIncrease} />
      )}
      <NavigateConatainer>
        <ButtonContainer>
          <NavigateButton onClick={() => setStage(1)} isClicked={stage === 1}>
            Описание
            <BorderBox isClicked={stage === 1} />
          </NavigateButton>
          <NavigateButton onClick={() => setStage(2)} isClicked={stage === 2}>
            Статусы
            <BorderBox isClicked={stage === 2} />
          </NavigateButton>
          <NavigateButton onClick={() => setStage(3)} isClicked={stage === 3}>
            Публикация
            <BorderBox isClicked={stage === 3} />
          </NavigateButton>
        </ButtonContainer>
      </NavigateConatainer>
      {stage === 1 && currentRequestData?.positionName !== '' && (
        <FormContainer>
          <Form>
            <BasicInput name='positionName' onChange={(e) => { setPossValue(e.target.value); addToVacancy(e); }} value={possValue || currentRequestData?.positionName} title='Должность' />
            <BasicInput name='abilities' onChange={(e) => { addToVacancy(e); }} placeholder='Разделить - точка запятая ;' title='Ключевые навыки' />
            <BasicCheckBoxesConatiner>
              <BoxesHeader>Опыт работы</BoxesHeader>
              <ChecksPanel>
                <CheckBoxContainer>
                  <CheckBox name='work' id='base1' type='radio' />
                  <InputTitle htmlFor='base1'>Начало карьеры</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='work' id='base2' type='radio' />
                  <InputTitle htmlFor='base2'>1-3 года</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='work' id='base3' type='radio' />
                  <InputTitle htmlFor='base3'>3-6 лет</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='work' id='base4' type='radio' />
                  <InputTitle htmlFor='base4'>больше 6 лет</InputTitle>
                </CheckBoxContainer>
              </ChecksPanel>
            </BasicCheckBoxesConatiner>
            <BasicCheckBoxesConatiner>
              <BoxesHeader>Занятость</BoxesHeader>
              <ChecksPanel>
                <CheckBoxContainer>
                  <CheckBox name='full' id='base1' type='checkbox' />
                  <InputTitle htmlFor='base1'>Полная занятость</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='partial' id='base2' type='checkbox' />
                  <InputTitle htmlFor='base2'>Частичная занятость</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='permanent' id='base3' type='checkbox' />
                  <InputTitle htmlFor='base3'>Проектная  / временная работа</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='volont' id='base4' type='checkbox' />
                  <InputTitle htmlFor='base4'>Волонтерство</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='intern' id='base5' type='checkbox' />
                  <InputTitle htmlFor='base5'>Стажировка</InputTitle>
                </CheckBoxContainer>
              </ChecksPanel>
            </BasicCheckBoxesConatiner>
            <BasicCheckBoxesConatiner>
              <BoxesHeader>График работы</BoxesHeader>
              <ChecksPanel>
                <CheckBoxContainer>
                  <CheckBox name='fullday' id='base1' type='checkbox' />
                  <InputTitle htmlFor='base1'>Полный день</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='parts' id='base2' type='checkbox' />
                  <InputTitle htmlFor='base2'>Сменный график</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='flex' id='base3' type='checkbox' />
                  <InputTitle htmlFor='base3'>Гибкий график</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='distance' id='base4' type='checkbox' />
                  <InputTitle htmlFor='base4'>Удаленная работа</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='tour' id='base5' type='checkbox' />
                  <InputTitle htmlFor='base5'>Вахтовый метод</InputTitle>
                </CheckBoxContainer>
              </ChecksPanel>
            </BasicCheckBoxesConatiner>
            <Dropdown globalSet={setPlace} title='Место работы' items={arr} withTitle />
            <BasicCheckBoxesConatiner>
              <BoxesHeader>Контактная информация</BoxesHeader>
              <ChecksPanel>
                <CheckBoxContainer>
                  <CheckBox name='set' id='base1' type='radio' />
                  <InputTitle htmlFor='base1'>Не указывать</InputTitle>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <CheckBox name='set' id='base2' type='radio' />
                  <InputTitle htmlFor='base2'>Указывать</InputTitle>
                </CheckBoxContainer>
              </ChecksPanel>
            </BasicCheckBoxesConatiner>
            <TextArea onChange={(e) => setRespValue(e.target.value)} value={responsValue || currentRequestData?.responsibilities} name='responsibilities' title='Обязанности кандидата' />
            <TextArea onChange={(e) => setReqValue(e.target.value)} value={requrementValue || currentRequestData?.requirements} name='requirements' title='Требования к кандидату' />
            <TextArea onChange={(e) => setComments(e.target.value)} value={commentValue || currentRequestData?.comments} name='comments' title='Комментарии' />

          </Form>
        </FormContainer>
      )}

      {stage === 2 && <Constructor levelsArray={approveStages!} />}
      {stage === 3 && <LogoHH onClick={publishWhere} />}
      <ButtonsContainer>
        <OptionButton onClick={() => setStage(1)} disabled={stage === 1} type='button' direction={stage === 1 ? '' : 'Back'}>Назад</OptionButton>
        <OptionButton onClick={() => { stage === 2 ? setStage(3) : stage === 3 ? addAndGo() : setStage(2); }} type='button' direction='Next'>{stage === 3 ? 'Сохранить' : 'Продолжить'}</OptionButton>
        <OptionButton type='button' direction='Cancel'>Отмена</OptionButton>
      </ButtonsContainer>
    </Layout>

  );
};

export default PublishingLayout;
