import { Flex, Text } from '@chakra-ui/react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Cards } from './types';

interface KanbanLaneProps {
    title: string;
    items: any;
}
const UserTablet = styled.div`
    display: flex;
    background-color: white;
    padding: 10px;
    border: 1px solid rgba(214, 237, 255, 1);
`;
const Image = styled.img`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-right: 5px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: rgba(231, 90, 217, 0.1);
    padding-left: 5px;
    height: 60px;
    margin-bottom: 10px;
`;
const P = styled.p`
    font-family: 'Montserrat';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 120%;


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

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: 10px;
     background: #FBFBFB;
     border: 1px solid #F6F6F6;
     height: 100%;
`;

const KanbanItem = ({
    title,
    index,
    parent,
}: {
    title: string;
    index: number;
    parent: string;
}) => {
    const {
        attributes, listeners, setNodeRef, transform,
    } = useDraggable({
        id: title,
        data: {
            title,
            index,
            parent,
        },
    });
    const resume = {
        name: 'Павел Дуров', city: 'Moscow', procent: '55%', img: 'https://novatrade.pro/upload/pic_1.png',
    };
    const navigate = useNavigate();
    const style = {
        transform: CSS.Translate.toString(transform),
    };
    return (

        <UserTablet onClick={() => navigate('/vacansies')} title={title} parent={parent} ref={setNodeRef} {...listeners} {...attributes}>
            <Image src={resume.img} />
            <Wrapper>
                <P>{resume.name}</P>
                <Span>{resume.city}</Span>
            </Wrapper>
        </UserTablet>

    );
};

export default function KanbanLane({ title, items }: KanbanLaneProps) {
    const { setNodeRef } = useDroppable({
        id: title,
    });

    return (
        <Flex flex='3' padding='1' flexDirection='column' minH='48rem'>
            <TextWrapper>
                <Text fontWeight='bold'>{title}</Text>
            </TextWrapper>

            <Column
                ref={setNodeRef}>

                {items.map((el, key) => (
                    <KanbanItem title={el.title} key={key} index={key} parent={title} />
                ))}
            </Column>
        </Flex>
    );
}
