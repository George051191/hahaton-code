/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setCurrentRequest, timer } from '../store/vacancyRequestsSlice';

const getCurrentRequestsThunk: AppThunk = (id: number) => async (dispatch, getState) => {
  dispatch(timer(false));
  try {
    const currentRequest = await axios.get(`${baseUrl}/api/vacancyrequest?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setCurrentRequest(currentRequest.data.vacancyRequest));
    dispatch(timer(true));
  } catch (error) {

  }
};

export default getCurrentRequestsThunk;
