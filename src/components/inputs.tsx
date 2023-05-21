import React, { FC } from 'react';
import styled from 'styled-components';
import { TBasicInput, TInputWithSelect } from '../types/components-types';
import { ArrowIcon } from './icons';
import Delete from '../assets/images/deletepng.png';

const Input = styled.input`
border: none;
outline: none;
padding-left: 7px;
    width: 100%;
    height: 36px;
    background-color: ${({ theme: { inputBg } }) => inputBg};
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
`;

const InputTitle = styled.p`
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
const Error = styled.span`
    color:${({ theme: { secondaryButtonsColor } }) => secondaryButtonsColor};
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 17px;
`;

const Datalist = styled.datalist`
       position: absolute;
       background-color: ${({ theme: { inputBg } }) => inputBg};
    
    display: flex;
    width: 100%;
 
    padding: 5px;
    overflow-y: auto;
    top: 70px;
    flex-direction: column;
   
    padding-left: 7px;
    transition: all ease .5s;
`;

const DataListItem = styled.option`
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 17px;
margin-bottom: 5px;
color: ${({ theme: { inputValuesColor } }) => inputValuesColor};
cursor: pointer;
&:hover {
    color: rgba(0, 56, 154, 1);
}
`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
 
`;
const DeleteIcon = styled.img`
    width: 14px;
    height: 14px;
    
`

const ListItem = styled.li<{ pos: number }>`
    padding: 0;
    margin: 0;
    margin-right: -6px;
    z-index: 10;
    width: 32px;
    height: 32px;
    background-color:${({ pos }) => (pos === 0 ? '#FF4E58' : pos === 1 ? '#DF0B92' : pos === 2 ? '#650ACC' : pos === 3 ? '#097FAA' : 'rgba(26, 56, 96, 0.1)')} ;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: ${({ pos, theme: { bgColor } }) => (pos === 4 ? 'rgba(27, 43, 65, 0.69)' : bgColor)};
cursor: pointer;
`;

const InputWithSelect: FC<TInputWithSelect> = ({
    value, title, onChange, onOptionClick, propertiesArray, isDataOpen, dataArray,
}) => {
    const getNumberOfRest = (index: number, array: string[]) => {
        if (index === 4) {
            return `+${array.length - 4}`;
        }
        const Tab = array[index].indexOf(' ');
        return array[index][0] + array[index][Tab + 1];
    };
    return (
        <InputWrapper>
            <InputTitle>{title}</InputTitle>
            <Input value={value} onChange={onChange} />
            <ArrowIcon isActive={isDataOpen} onClick={onChange} />
            {!isDataOpen
                && (
                    <List>
                        {dataArray.slice(0, 5).map((el, index) => (

                            <ListItem onClick={onChange} key={el} pos={index}>
                                {getNumberOfRest(index, dataArray)}

                            </ListItem>
                        ))}
                    </List>
                )}
            {isDataOpen
                && (
                    <Datalist>
                        {propertiesArray.map((el) => (


                            <DataListItem key={el} onClick={onOptionClick}>

                                {el}

                            </DataListItem>

                        ))}

                    </Datalist>
                )}
        </InputWrapper>
    );
};
const BasicInput: FC<TBasicInput> = ({
    onChange, title, type, error,
}) => (
    <InputWrapper>
        <InputTitle>{title}</InputTitle>
        <Input type={type} onChange={onChange} />
        <Error>{error}</Error>
    </InputWrapper>
);

export { BasicInput, InputWithSelect };
