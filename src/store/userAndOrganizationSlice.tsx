import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCurrentUser, TDepartment } from '../types/apiTypes';

type TState = {
  currentUser: TCurrentUser | null;
  allSystemUsers: TCurrentUser[] | null;
  allDepartments: TDepartment[] | null;
  stagePopupOpen: boolean;
};

const initialState: TState = {
  currentUser: null,
  allDepartments: null,
  allSystemUsers: null,
  stagePopupOpen: false,
};

const userAndOrgDataSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<TCurrentUser>) => ({
      ...state, currentUser: action.payload,
    }),
    setAllSystemsUsers: (state, action: PayloadAction<TCurrentUser[]>) => ({
      ...state, allSystemUsers: action.payload,
    }),
    setAllDepartments: (state, action: PayloadAction<TDepartment[]>) => ({
      ...state, allDepartments: action.payload,
    }),
    openStagePopup: (state, action: PayloadAction<boolean>) => ({
      ...state, stagePopupOpen: action.payload,
    }),
  },
});

const allReducer = userAndOrgDataSlice.reducer;
export const {
  setCurrentUser,
  setAllSystemsUsers,
  setAllDepartments,
  openStagePopup,
} = userAndOrgDataSlice.actions;

export default allReducer;
