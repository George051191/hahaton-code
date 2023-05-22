/* eslint-disable ternary/no-unreachable */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
  BasicInput, InputWithSelect, TextArea, InputForPositionSelect, InputWithDate,
} from './inputs';

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
  const [division, setDivision] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [addedNames, setAddedNames] = useState<string[]>([]);
  const [isDivisionOpen, openDivisions] = useState(false);
  const [isNamesOpen, openNamesPanel] = useState(false);
  const [isAddedNamesOpen, openAddedNamesPanel] = useState(false);
  const [formValues, setVolume] = useState({});
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState();
  const [stage, setStage] = useState<number>(1);
  const onDecrease = () => {
    if (amount === 0) { return; }
    setAmount(amount - 1);
  };

  const onIncrease = () => {
    setAmount(amount + 1);
  };

  const addToVacancy = (e: any) => {
    const { name } = e.target;
    const { value } = e.target;
    setVolume({
      ...formValues,
      name: value,
    });
  };

  /// с сервера приходят имена сотрудников и названия подразделений
  const dataArray = ['Вахтеры', 'Монтажники', 'Шахтеры'];
  const namesArray = ['Георгий Александрович', 'Гevorg Александрович'];

  const checkStatus = (e: any) => {
    if (division.includes(e.target.value)) {
      return;
    }
    setDivision([...division, e.target.value]);
  };

  const checkStatusNames = (e: any) => {
    if (names.includes(e.target.value)) {
      return;
    }
    setNames([...names, e.target.value]);
  };

  const checkAddedNames = (e: any) => {
    if (addedNames.includes(e.target.value)) {
      return;
    }
    setAddedNames([...addedNames, e.target.value]);
  };

  const deleteItem = (item: string) => {
    const arr = division.filter((el) => el !== item);
    setDivision(arr);
  };

  const deleteIteminNames = (item: string) => {
    const arr = names.filter((el) => el !== item);
    setNames(arr);
  };

  const deleteAddedName = (item: string) => {
    const arr = addedNames.filter((el) => el !== item);
    setAddedNames(arr);
  };

  return (
    <Layout>
      <PositionedButton>Сохранить как шаблон</PositionedButton>
      <FormContainer>
        {stage === 1 && (
          <Form>

            <BasicInput name='position' type='text' title='Должность' onChange={(e) => addToVacancy(e)} />
            <Wrapper>
              <InputForPositionSelect value={amount} onDecrease={onDecrease} onIncrease={onIncrease} title='Количество позиций' />
              <InputWithDate title='Дата закрытия вакансии' value={date} onClick={(e) => setDate(e.target.value)} />
            </Wrapper>
            <InputWithSelect
              title='Подразделения'
              dataArray={division}
              isDataOpen={isDivisionOpen}
              value={`Выбрано ${division.length}`}
              onChange={() => openDivisions(!isDivisionOpen)}
              onOptionClick={(e) => { checkStatus(e); openDivisions(false); }}
              propertiesArray={dataArray}
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
                propertiesArray={namesArray}
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
                propertiesArray={namesArray}
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
                        <OptionButton onClick={() => setStage(1)} disabled={stage === 1} type='button' direction={stage === 1 ? '' : 'Back'}>Назад</OptionButton>
                        <OptionButton onClick={() => setStage(2)} type='button' direction='Next'>{stage === 1 ? 'Продолжить' : 'Отправить на согласование'}</OptionButton>
                        <OptionButton type='button' direction='Cancel'>Отмена</OptionButton>
                      </ButtonsContainer>
                    </Form>
                    )}
      </FormContainer>

    </Layout>
  );
};

export default LayoutForCreateVacancy;
