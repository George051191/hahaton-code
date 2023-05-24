import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TResumeData } from '../types/apiTypes';

type TState = {
  allResumes: TResumeData[] | null;
};

const initialState: TState = {
  allResumes: null,
};

const resumes = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setAllResumes: (state, action: PayloadAction<TResumeData[]>) => ({
      ...state, allResumes: action.payload,
    }),

  },
});

const resumesReducer = resumes.reducer;
export const {
  setAllResumes,
} = resumes.actions;

export default resumesReducer;
