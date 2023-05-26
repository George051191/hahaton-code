import { ChakraProvider, theme, Text } from '@chakra-ui/react';
import KanbanBoard from './Kanban/Kanban';
import { useDispatch, useSelector } from '../store/store.type';

export const Candidats = () => {
    const { currentVacancy } = useSelector((state) => state.request);

    return (
        <ChakraProvider theme={theme}>
            <Text fontSize='2xl' padding='5' fontWeight='bold' fontStyle='normal'>
                {currentVacancy}
            </Text>
            <KanbanBoard />
        </ChakraProvider>
    );
};

export default Candidats;
