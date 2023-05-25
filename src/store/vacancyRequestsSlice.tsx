import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TVacancyRequest, TApproveStage, TVacancy, TRequestForPost } from '../types/apiTypes';

type TState = {
  allVacanciesRequests: TVacancyRequest[] | null;
  currentVacanciesRequest: TVacancyRequest[] | null;
  approveStages: TApproveStage[] | null;
  vacansies: TVacancy[] | null;
  currentRequestData: TRequestForPost | null;
};

const initialState: TState = {
  allVacanciesRequests: null,
  currentVacanciesRequest: null,
  approveStages: null,
  vacansies: null,
  currentRequestData: null,
};

const allRequests = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setAllRequests: (state, action: PayloadAction<TVacancyRequest[]>) => ({
      ...state, allVacanciesRequests: action.payload,
    }),
    setStages: (state, action: PayloadAction<TApproveStage[]>) => ({
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
    })
  },
});

const requestReducer = allRequests.reducer;
export const {
  setAllRequests,
  setStages,
  setVacancies,
  setCurrentRequest,
  setCurrentRequesrArray,
} = allRequests.actions;

export default requestReducer;
