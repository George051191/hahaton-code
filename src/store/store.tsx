import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import requestReducer from './vacancyRequestsSlice';
import allReducer from './userAndOrganizationSlice';
import resumesReducer from './resumeSlice';

const store = configureStore({
  reducer: {
    resume: resumesReducer,
    request: requestReducer,
    allBaseData: allReducer,
  },
  middleware: [thunk],

});
export default store;
