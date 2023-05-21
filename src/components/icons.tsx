/* eslint-disable ternary/no-unreachable */
import React, { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as BagPic } from '../assets/images/bag.svg';
import { ReactComponent as EditPic } from '../assets/images/settings.svg';
import { ReactComponent as ProfilePic } from '../assets/images/profile.svg';
import { ReactComponent as ChartPic } from '../assets/images/chart.svg';
import { ReactComponent as StructurePic } from '../assets/images/structure.svg';
import { ReactComponent as ArrowPic } from '../assets/images/arrow.svg';
import { ReactComponent as DeletePic } from '../assets/images/deletepng.png';

export const BagIcon = styled(BagPic) <{ isActive: boolean }>`
  width: 17px;
  height: 17px;
  display: block;
  & > path {
    stroke:${({ isActive }) => (isActive ? '#00389A' : '#838A9D')};
    }
`;

export const ProfileIcon = styled(ProfilePic) <{ isActive: boolean }>`
  width: 17px;
  height: 17px;
  display: block;
  & > path {
    stroke:${({ isActive }) => (isActive ? '#00389A' : '#838A9D')};
    }
`;

export const ChartIcon = styled(ChartPic) <{ isActive: boolean }>`
  width: 17px;
  height: 17px;
  display: block;
  & > path {
    stroke:${({ isActive }) => (isActive ? '#00389A' : '#838A9D')};
    }
`;

export const EditIcon = styled(EditPic) <{ isActive: boolean }>`
  width: 17px;
  height: 17px;
  display: block;
  & > path {
    stroke:${({ isActive }) => (isActive ? '#00389A' : '#838A9D')};
    }
`;

export const StructureIcon = styled(StructurePic) <{ isActive: boolean }>`
  width: 17px;
  height: 17px;
  display: block;
  & > path {
    stroke:${({ isActive }) => (isActive ? '#00389A' : '#838A9D')};
    }
`;

export const ArrowIcon = styled(ArrowPic) <{ isActive: boolean }>`
  width: 14px;
  height:14px;
  cursor: pointer;
  display: block;
  position: absolute;
  top: 37px;
  right: 15px;
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(360deg)')};
`;

