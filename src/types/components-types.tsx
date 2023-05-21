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
  onChange: () => void;
  title: string;
  type: string;
  error?: string;
}

export type TInputWithSelect = {
  title: string;
  onChange: () => void;
  onOptionClick: (e: any) => void;
  propertiesArray: string[];
  value: string;
  isDataOpen: boolean;
  dataArray: string[];
}