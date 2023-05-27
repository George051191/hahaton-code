/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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

export const getNumberOfRest = (index: number, array: any) => {
  if (array.includes(undefined)) { return; }
  
  if (index === 4) {
    return `+${array.length - 4}`;
  }

  const Tab = array[index].name.indexOf(' ');
  return array[index].name[0] + array[index].name[Tab + 1];
};

export const getNumberInArray = (ind: number, index: number, array: any) => {
  if (array.includes(undefined)) { return; }
  
  if (array[ind].length > 4 && index === 4) {
    return `+${array[ind].length - 4}`;
  }

  const Tab = array[ind][index].name.indexOf(' ');
  return array[ind][index].name[0] + array[ind][index].name[Tab + 1];
};
