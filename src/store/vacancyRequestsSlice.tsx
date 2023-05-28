/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TVacancyRequest, TApproveStage, TVacancy, TRequestForPost,
} from '../types/apiTypes';

type TState = {
  allVacanciesRequests: TVacancyRequest[] | null;
  currentVacanciesRequest: TVacancyRequest[] | null;
  approveStages: TApproveStage[] | null;
  vacansies: TVacancy[] | null;
  currentVacanciesArr: TVacancy[] | null;
  currentRequestData: TRequestForPost | null;
  currentVacancy: string | null;
  timer: boolean;
  currentRequestId: number | null;
  prePublishVacancy: any;
  currentVacancyObject: any;
};

const initialState: TState = {
  allVacanciesRequests: null,
  currentVacanciesRequest: null,
  approveStages: null,
  vacansies: null,
  currentRequestData: null,
  currentVacanciesArr: null,
  currentVacancy: null,
  timer: false,
  currentRequestId: null,
  prePublishVacancy: null,
  currentVacancyObject: '',
};

const allRequests = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setAllRequests: (state, action: PayloadAction<TVacancyRequest[]>) => ({
      ...state, allVacanciesRequests: action.payload,
    }),
    setStages: (state, action: PayloadAction<any>) => ({
      ...state, approveStages: action.payload,
    }),
    setVacancies: (state, action: PayloadAction<TVacancy[]>) => ({
      ...state, vacansies: action.payload,
    }),
    setCurrentRequest: (state, action: PayloadAction<TRequestForPost | null>) => ({
      ...state, currentRequestData: action.payload,
    }),
    setCurrentRequesrArray: (state, action: PayloadAction<TVacancyRequest[]>) => ({
      ...state, currentVacanciesRequest: action.payload,
    }),
    setCurrentVacancyArray: (state, action: PayloadAction<TVacancy[]>) => ({
      ...state, currentVacanciesArr: action.payload,
    }),
    setCurrentVacancy: (state, action: PayloadAction<string>) => ({
      ...state, currentVacancy: action.payload,
    }),
    timer: (state, action: PayloadAction<boolean>) => ({
      ...state, timer: action.payload,
    }),
    setId: (state, action: PayloadAction<number>) => ({
      ...state, currentRequestId: action.payload,
    }),
    setprePublishVacancy: (state, action: PayloadAction<any>) => ({
      ...state, prePublishVacancy: action.payload,
    }),
    setCurrentVacancyObject: (state, action: PayloadAction<any>) => ({
      ...state, currentVacancyObject: action.payload,
    }),
  },
});

const requestReducer = allRequests.reducer;
export const {
  setAllRequests,
  setStages,
  setVacancies,
  setCurrentRequest,
  setCurrentRequesrArray,
  setCurrentVacancyArray,
  setCurrentVacancy,
  timer,
  setId,
  setprePublishVacancy,
  setCurrentVacancyObject,
} = allRequests.actions;

export default requestReducer;
