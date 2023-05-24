import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCurrentUser, TDepartment } from '../types/apiTypes';

type TState = {
  currentUser: TCurrentUser | null;
  allSystemUsers: TCurrentUser[] | null;
  allDepartments: TDepartment[] | null;

};

const initialState : TState = {
  currentUser: null,
  allDepartments: null,
  allSystemUsers: null,
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
  },
});

const allReducer = userAndOrgDataSlice.reducer;
export const {
  setCurrentUser,
  setAllSystemsUsers,
  setAllDepartments,
} = userAndOrgDataSlice.actions;

export default allReducer;

/*   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi0JjQstCw0L3QvtCyINCY0LLQsNC9INCY0LLQsNC90L7QstC40YciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwibmJmIjoxNjg0OTU5ODg1LCJleHAiOjE2ODc1NTE4ODUsImlzcyI6IlNLQl9BdXRoU2VydmVyIiwiYXVkIjoiU0tCX0hhY2thdGhvblNpdGUifQ.GNDgTlrh4m5wDHCI-jr1J6XAwiBxZ3lJYCy1BAP3hpg */
// recrut
/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi0J_QtdGC0YDQvtCyINCf0LXRgtGAINCf0LXRgtGA0L7QstC40YciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJyZWNydXRlciIsIm5iZiI6MTY4NDk1OTk5MSwiZXhwIjoxNjg3NTUxOTkxLCJpc3MiOiJTS0JfQXV0aFNlcnZlciIsImF1ZCI6IlNLQl9IYWNrYXRob25TaXRlIn0.w8JhoxomXZRefcOVcCSU1eiWNFB-5W0ZMKyqrw1EqmU */
