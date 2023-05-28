/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TResumeData } from '../types/apiTypes';

type TState = {
  allResumes: TResumeData[] | null;
  mappedData: any;
  emailCurrent: string | null;
  currentIdVacancy: any;
};

const initialState: TState = {
  allResumes: null,
  mappedData: null,
  emailCurrent: null,
  currentIdVacancy: null,
};

const resumes = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setAllResumes: (state, action: PayloadAction<TResumeData[]>) => ({
      ...state, allResumes: action.payload,
    }),
    setMappedData: (state, action: PayloadAction<any>) => ({
      ...state, mappedData: action.payload,
    }),
    setEmail: (state, action: PayloadAction<any>) => ({
      ...state, mappedData: action.payload,
    }),
    setCurrentIdVacancy: (state, action: PayloadAction<any>) => ({
      ...state, currentIdVacancy: action.payload,
    }),
  },
});

const resumesReducer = resumes.reducer;
export const {
  setAllResumes,
  setMappedData,
  setEmail,
  setCurrentIdVacancy,
} = resumes.actions;

export default resumesReducer;
