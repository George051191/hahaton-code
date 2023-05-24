import {
  BagIcon, ProfileIcon, EditIcon, ChartIcon, StructureIcon,
} from '../../components/icons';

export const linksArray = [
  {
    icon: ProfileIcon, urlName: '/candidats', title: 'Кандидаты', path: '/candidats',
  },
  {
    icon: BagIcon, urlName: '/vacancies', title: 'Вакансии', path: '/vacancies',
  },
  {
    icon: StructureIcon, urlName: '/structure', title: 'Орг. структура', path: '/structure',
  },
  {
    icon: ChartIcon, urlName: '/analitics', title: 'Аналитика', path: '/analitics',
  },
  {
    icon: EditIcon, urlName: '/settings', title: 'Настройки', path: '/settings',
  },

];

export const getNumberOfRest = (index: number, array: string[]) => {
  if (index === 4) {
    return `+${array.length - 4}`;
  }
  const Tab = array[index].indexOf(' ');
  return array[index][0] + array[index][Tab + 1];
};
