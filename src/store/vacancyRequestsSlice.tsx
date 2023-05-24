import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TVacancyRequest, TApproveStage, TVacancy } from '../types/apiTypes';

type TState = {
  allVacanciesRequests: TVacancyRequest[] | null;
  approveStages: TApproveStage[] | null;
  vacansies: TVacancy[] | null;
};

const initialState: TState = {
  allVacanciesRequests: null,
  approveStages: null,
  vacansies: null,
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
  },
});

const requestReducer = allRequests.reducer;
export const {
  setAllRequests,
  setStages,
  setVacancies,
} = allRequests.actions;

export default requestReducer;
