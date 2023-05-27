/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import {
  BasicInput, InputWithSelect, TextArea, InputForPositionSelect, InputWithDate,
} from './inputs';
import { useDispatch, useSelector } from '../store/store.type';
import { TApprover, TDepartment, TRequestForPost } from '../types/apiTypes';
import { setCurrentRequest } from '../store/vacancyRequestsSlice';
import postRequestsThunk from '../thunks/post-request-thunk';
import getAllRequestsThunk from '../thunks/get-request-thunk';
const Layout = styled.section`
    margin-left: 212px;
    margin-top: 80px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
 `;

const FormContainer = styled.div`
    width: 100%;
  
    display: flex;
    flex-direction: column;
`;

const PositionedButton = styled.button`
    cursor: pointer;
    margin-right: 6vw;
    font-family: 'Inter';
    font-style: normal;
    align-self: end;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${({ theme: { mainButtonsColor } }) => mainButtonsColor};
`;

const Form = styled.form`
    display: flex;
    max-width: 665px;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    gap: 38px;
    position: relative;
`;

const Wrapper = styled.div`
    max-width: 665px;
    width: 100%;
    display: flex;
    gap: 30px;
`;

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;
    margin-top: 62px;
`;
const Legend = styled.legend`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color:rgba(0, 0, 0, 1);
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

const LayoutForCreateVacancy: FC = () => {
  const navigate = useNavigate();

  const { allDepartments, allSystemUsers, currentUser } = useSelector((state) => state.allBaseData)
  const [division, setDivision] = useState<TDepartment[]>([]);
  const [names, setNames] = useState<TApprover[]>([]);
  const [addedNames, setAddedNames] = useState<TApprover[]>([]);
  const [isDivisionOpen, openDivisions] = useState(false);
  const [isNamesOpen, openNamesPanel] = useState(false);
  const [isAddedNamesOpen, openAddedNamesPanel] = useState(false);
  const [formValues, setVolume] = useState({});
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState();
  const [stage, setStage] = useState<number>(1);
  const dispatch = useDispatch();

  const onDecrease = () => {
    if (amount === 0) { return; }
    setAmount(amount - 1);
    setVolume({
      ...formValues,
      positionCount: amount,
    })
  };

  const onIncrease = () => {
    setAmount(amount + 1);
    setVolume({
      ...formValues,
      positionCount: amount,
    })
  };

  const writeDate = (el: any) => {
    setDate(el);
    setVolume({
      ...formValues,
      deadline: el,
    })
  }

  const addToVacancy = (e: any) => {

    const { value, name } = e.target;

    setVolume({
      ...formValues,
      [name]: value,
    });
  };

  const gotTOPublish = () => {
    if (stage === 2) {
      // dispatch(setCurrentRequest({ ...formValues, customers: [currentUser] } as TRequestForPost))
      dispatch(postRequestsThunk())

      navigate('/analitics')
      return
    }
    setStage(2)

  }


  const checkStatus = (e: any) => {
    if (division.find((elem) => {
      return elem.name === e.target.value
    })) {
      return;
    }
    const findDivision = allDepartments?.find(div => div.name === e.target.value)
    setDivision([...division, findDivision!]);

    setVolume({
      ...formValues,
      departments: [...division, findDivision]
    })
  };

  const checkStatusNames = (e: any) => {
    if (names.find((elem) => {
      return elem.name === e.target.value
    })) {
      return;
    }
    const findDivision = allSystemUsers?.find(div => div.name === e.target.value)
    setNames([...names, findDivision!]);
    setVolume({
      ...formValues,
      approvers: [...names, findDivision]
    })
  };

  const checkAddedNames = (e: any) => {
    if (addedNames.find((elem) => {
      return elem.name === e.target.value
    })) {
      return;
    }
    const findDivision = allSystemUsers?.find(div => div.name === e.target.value)
    setAddedNames([...addedNames, findDivision!]);
    setVolume({
      ...formValues,
      addedApprovers: [...addedNames, findDivision]
    })
  };

  const deleteItem = (item: string) => {
    console.log(item)
    const arr = division.filter((el) => el.name !== item);

    setDivision(arr);
    setVolume({
      ...formValues,
      departments: arr
    })
  };

  const deleteIteminNames = (item: string) => {
    const arr = names.filter((el) => el.name !== item);
    setNames(arr);
    setVolume({
      ...formValues,
      approvers: arr
    })
  };

  const deleteAddedName = (item: string) => {
    const arr = addedNames.filter((el) => el.name !== item);
    setAddedNames(arr);
    setVolume({
      ...formValues,
      addedApprovers: arr
    })
  };

  return (
    <Layout>
      <PositionedButton>Сохранить как шаблон</PositionedButton>
      <FormContainer>
        {stage === 1 && (
          <Form>

            <BasicInput name='positionName' type='text' title='Должность' onChange={(e) => addToVacancy(e)} />
            <Wrapper>
              <InputForPositionSelect value={amount} onDecrease={onDecrease} onIncrease={onIncrease} title='Количество позиций' />
              <InputWithDate title='Дата закрытия вакансии' value={date!} onClick={(e) => writeDate(e.target.value)} />
            </Wrapper>
            <InputWithSelect
              title='Подразделения'
              dataArray={division}
              isDataOpen={isDivisionOpen}
              value={`Выбрано ${division.length}`}
              onChange={() => openDivisions(!isDivisionOpen)}
              onOptionClick={(e) => { checkStatus(e); openDivisions(false); }}
              propertiesArray={allDepartments ?? []}
              deleteItem={deleteItem} />
            <Fieldset>
              <Legend>Согласующие лица</Legend>
              <InputWithSelect
                title='Сотрудники'
                dataArray={names}
                isDataOpen={isNamesOpen}
                value={`Выбрано ${names.length}`}
                onChange={() => openNamesPanel(!isNamesOpen)}
                onOptionClick={(e) => { checkStatusNames(e); openNamesPanel(false); }}
                propertiesArray={allSystemUsers ?? []}
                deleteItem={deleteIteminNames} />
            </Fieldset>
            <Fieldset>
              <Legend>Дополнительно оповещать</Legend>
              <InputWithSelect
                title='Сотрудники'
                dataArray={addedNames}
                isDataOpen={isAddedNamesOpen}
                value={`Выбрано ${addedNames.length}`}
                onChange={() => openAddedNamesPanel(!isAddedNamesOpen)}
                onOptionClick={(e) => { checkAddedNames(e); openAddedNamesPanel(false); }}
                propertiesArray={allSystemUsers ?? []}
                deleteItem={deleteAddedName} />
            </Fieldset>
            <ButtonsContainer>
              <OptionButton onClick={() => setStage(1)} disabled={stage === 1} type='button' direction={stage === 1 ? '' : 'Back'}>Назад</OptionButton>
              <OptionButton onClick={() => setStage(2)} type='button' direction='Next'>{stage === 1 ? 'Продолжить' : 'Отправить на согласование'}</OptionButton>
              <OptionButton type='button' direction='Cancel'>Отмена</OptionButton>
            </ButtonsContainer>
          </Form>
        )}
        {stage === 2
          && (
            <Form>
              <BasicInput onChange={(e) => addToVacancy(e)} name='template' type='text' title='Шаблон заявки(не обязательно)' />
              <BasicInput onChange={(e) => addToVacancy(e)} name='salary' salary type='number' title='Зарплата' />
              <TextArea onChange={(e) => addToVacancy(e)} name='responsibilities ' title='Обязанности кандидата' />
              <TextArea onChange={(e) => addToVacancy(e)} name='requirement' title='Требования к кандидату' />
              <TextArea onChange={(e) => addToVacancy(e)} name='comments' title='Комментарии' />
              <ButtonsContainer>
                <OptionButton onClick={() => setStage(1)} disabled={stage <= 1} type='button' direction={stage <= 1 ? '' : 'Back'}>Назад</OptionButton>
                <OptionButton onClick={() => { gotTOPublish() }} type='button' direction='Next'>{stage <= 1 ? 'Продолжить' : 'Отправить на согласование'}</OptionButton>
                <OptionButton type='button' direction='Cancel'>Отмена</OptionButton>
              </ButtonsContainer>
            </Form>
          )}
      </FormContainer>

    </Layout>
  );
};

export default LayoutForCreateVacancy;
