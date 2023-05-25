import { StyledComponent } from 'styled-components';
import { TApprover, TDepartment } from './apiTypes';

export type TSidebar = {
  linksArray:
  {
    icon: StyledComponent<any, { isActive: boolean }>,
    urlName: string,
    title: string,
    path: string
  }[];
};

export type TBasicInput = {
  onChange?: (e: any) => void;
  title?: string;
  type?: string;
  error?: string;
  name?: string;
  salary?: boolean;
  placeholder?: string;
  value?: string;
};

export type TDropdownWithDelete = {
  title: string;
  forDivision?: boolean;
  forAprove?: boolean;
  forClient?: boolean;
  forMain?: boolean;
  approversArr?: string[];
  mainArr?: string[];
  clientArr?: string[];
  divisionArr?: string[];
};

export type TBasicTextArea = Omit<TBasicInput, 'type' | 'error'>;

export type TInputWithSelect = {
  title: string;
  onChange: () => void;
  onOptionClick: (e: any) => void;
  propertiesArray?: TDepartment[] | TApprover[];
  value: string;
  isDataOpen?: boolean;
  dataArray?: TDepartment[] | TApprover[];
  deleteItem: (el: string) => void;
};

export type TInputForAmount = {
  onIncrease: () => void;
  onDecrease: () => void;
  value: number;
  title: string;
};

export type TInputWithDate = {
  onClick: (e: any) => void;
  value: string;
  title: string;
};

export const enum StatusEnum {
  send = 'send',
  cancel = 'cancel',
  agreed = 'agreed',
  inprocess = 'inprocess',
}

export type TRequestVacancyPlate = {
  title: string;
  divisions: TDepartment[] | TApprover[];
  coordinators: TDepartment[] | TApprover[];
  amount: number;
  salary: number;
  stats: StatusEnum;
  date: Date | string;
};

export type TConstructor = {
  levelsArray: {
    title: string,
    bgColor: string,
    border: string
  }[];
  approvers: string[];
};
