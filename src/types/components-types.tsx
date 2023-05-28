/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyledComponent } from 'styled-components';
import { TApprover, TCurrentUser, TDepartment } from './apiTypes';

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
  approversArr?: TDepartment[] | TApprover[];
  mainArr?: TDepartment[] | TApprover[];
  clientArr?: TDepartment[] | TApprover[];
  divisionArr?: TDepartment[] | TApprover[];
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
  value: any;
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
  id: number;
  forVacancy: boolean;
};

export type TVacancyPlate = {
  title: string;
  approvers: TApprover[];
  responseMan: TCurrentUser;
  amount: number;
  salary: number;
  stats: StatusEnum;
  dateOfExpire: string | Date,
  daysInProgressStatus: number,
  id: number;
  forVacancy: boolean;
  candidats: number;
};

export type TConstructor = {
  levelsArray: any

};
