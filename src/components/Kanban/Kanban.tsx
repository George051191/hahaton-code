/* eslint-disable react/function-component-definition */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { DndContext, rectIntersection } from '@dnd-kit/core';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import KanbanLane from './KanbanLane';
import AddCard from './AddCard';
import { Cards } from './types';

export default function KanbanBoard() {
    const [todoItems, setTodoItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [uItems, setuItems] = useState([]);
    const [stage5, setStage5] = useState([]);
    const [stage6, setStage6] = useState([]);
    const [stage7, setStage7] = useState([]);
    const [stage8, setStage8] = useState([]);
    const resumes = [{
        name: 'Павел Дуров', city: 'Moscow', procent: '55%', img: 'https://dzen.ru/a/ZGYvq09XGTdwSa3C?from=feed&utm_referrer=https%3A%2F%2Fzen.yandex.com&rid=2038857713.46.1685104085521.20454&clid=3000&integration=mail_ru_morda_desktop&place=export&secdata=COi%2FzJyDMSABUJYJagEB&vid=MXBGNkdMMGlVem9IMDAwMDBpMU9MNFlIOjo6OTdkZGQyMS0wLTAtODY3N2QxNzpDQUFTRU44cG9raE9tcW1OMmlybHZnSURLR0VhWU0yRjNxeXl4a05oR1djVHRqVDI5Y0ZDanNCdDc5UldHSjZseDlYOTZpYUpfRktVMGh5NVlxUXlWMjlpaHhIZXFPOU8yU1c4THVzM0V4VDAtb1k3bW1ERGRLcGUyMWh0S21xckdYaUsyMklZaENxSEZzVkxrN1dVOUktbzFPay13UQ==&encoded_pulse_user_id=bUAHTIaIlwY7C4KFHaDj2ymhoDEmYGRNli5gmuQfnz4:1685104085745&from_site=mail',
    }];
    const addNewCard = (title: string) => {
        setuItems([...uItems, { title }]);
    };
    useEffect(() => {
        setTodoItems([...todoItems, { title: 'jhjhj' }]);
    }, []);
    return (
        <DndContext
            collisionDetection={rectIntersection}
            onDragEnd={(e) => {
                const container = e.over?.id;
                const title = e.active.data.current?.title ?? '';

                const index = e.active.data.current?.index ?? 0;
                const parent = e.active.data.current?.parent ?? 'ToDo';
                if (container === 'Новый') {
                    setTodoItems([...todoItems, { title }]);
                } else if (container === 'Анкетирование') {
                    setDoneItems([...doneItems, { title }]);
                } else if (container === 'Интервью с HR') {
                    setuItems([...uItems, { title }]);
                } else if (container === 'Интервью с заказч...') {
                    setInProgressItems([...inProgressItems, { title }]);
                } else if (container === 'Интервью с ком...') {
                    setStage5([...stage5, { title }]);
                } else if (container === 'Оффер') {
                    setStage6([...stage6, { title }]);
                } else if (container === 'Вышел на работу') {
                    setStage7([...stage7, { title }]);
                } else if (container === 'Отказ') {
                    setStage8([...stage8, { title }]);
                }

                if (parent === 'Новый') {
                    setTodoItems([
                        ...todoItems.slice(0, index),
                        ...todoItems.slice(index + 1),
                    ]);
                } else if (parent === 'Анкетирование') {
                    setDoneItems([
                        ...doneItems.slice(0, index),
                        ...doneItems.slice(index + 1),
                    ]);
                } else if (parent === 'Интервью с HR') {
                    setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
                } else if (parent === 'Интервью с заказч...') {
                    setInProgressItems([
                        ...inProgressItems.slice(0, index),
                        ...inProgressItems.slice(index + 1),
                    ]);
                } else if (parent === 'Интервью с ком...') {
                    setStage5([
                        ...stage5.slice(0, index),
                        ...stage5.slice(index + 1),
                    ]);
                } else if (parent === 'Оффер') {
                    setStage6([
                        ...stage6.slice(0, index),
                        ...stage6.slice(index + 1),
                    ]);
                } else if (parent === 'Вышел на работу') {
                    setStage7([
                        ...stage7.slice(0, index),
                        ...stage7.slice(index + 1),
                    ]);
                } else if (parent === 'Отказ') {
                    setStage8([
                        ...stage8.slice(0, index),
                        ...stage8.slice(index + 1),
                    ]);
                }
            }}>
            <Flex flexDirection='column'>

                <Flex flex='3'>
                    <KanbanLane title='Новый' items={todoItems} />
                    <KanbanLane title='Анкетирование' items={doneItems} />
                    <KanbanLane title='Интервью с HR' items={uItems} />
                    <KanbanLane title='Интервью с заказч...' items={inProgressItems} />
                    <KanbanLane title='Интервью с ком...' items={stage5} />
                    <KanbanLane title='Оффер' items={stage6} />
                    <KanbanLane title='Вышел на работу' items={stage7} />
                    <KanbanLane title='Отказ' items={stage8} />
                </Flex>
            </Flex>
        </DndContext>
    );
}
