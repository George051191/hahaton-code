/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TResumeData } from '../types/apiTypes';

type TState = {
  allResumes: TResumeData[] | null;
  mappedData: any;
};

const initialState: TState = {
  allResumes: null,
  mappedData: null,
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
  },
});

const resumesReducer = resumes.reducer;
export const {
  setAllResumes,
  setMappedData
} = resumes.actions;

export default resumesReducer;
