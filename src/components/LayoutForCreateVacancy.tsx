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
    
 `;

const FormContainer = styled.div`
    width: 100%;
  
    display: flex;
    flex-direction: column;
`;
const Form = styled.form`
    display: flex;
    max-width: 665px;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
`;

const Wrapper = styled.div`
    max-width: 665px;
    width: 100%;
    display: flex;
    gap: 30px;
`;

const LayoutForCreateVacancy: FC = () => {
    const [division, setDivision] = useState<string[]>([]);
    const [isDivisionOpen, openDivisions] = useState(false);
    const [formValues, setVolume] = useState({});
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState();
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
    const dataArray = ['Георгий Александрович', 'Гevorg Александрович'];

    const checkStatus = (e: any) => {
        if (division.includes(e.target.value)) {
            return;
        }
        setDivision([...division, e.target.value]);
    };

    const deleteItem = (item: string) => {
        const arr = division.filter((el) => el !== item);
        setDivision(arr);
    };

    return (
        <Layout>
            <FormContainer>
                <Form>
                    <BasicInput name='position' type='text' title='Должность' onChange={(e) => addToVacancy(e)} />
                    <Wrapper>
                        <InputForPositionSelect value={amount} onDecrease={onDecrease} onIncrease={onIncrease} title='Количество позиций' />
                        <InputWithDate title='Дата закрытия вакансии' value={date} onClick={(e) => setDate(e.target.value)} />
                    </Wrapper>
                </Form>
            </FormContainer>

        </Layout>
    );
};

export default LayoutForCreateVacancy;

/* position: '',
positionsAmount: null,
dateOfExpire: '',
division: '',
watchers: [],
additionalWatcher: '',
 */
