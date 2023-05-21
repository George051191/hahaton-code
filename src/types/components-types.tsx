import { StyledComponent } from 'styled-components';

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
  onChange: (e: any) => void;
  title: string;
  type: string;
  error?: string;
  name: string;
};

export type TBasicTextArea = Omit<TBasicInput, 'type' | 'error'>

export type TInputWithSelect = {
  title: string;
  onChange: () => void;
  onOptionClick: (e: any) => void;
  propertiesArray: string[];
  value: string;
  isDataOpen: boolean;
  dataArray: string[];
  deleteItem: (el: string) => void;
};

export type TInputForAmount = {
  onIncrease: () => void;
  onDecrease: () => void;
  value: number;
  title: string;
};

export type TInputWithDate = {
  onClick: () => void;
  value: string;
  title: string;
};
