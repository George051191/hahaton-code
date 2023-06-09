/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';

const postVacancyThunk: AppThunk = (request: any) => async (dispatch, getState) => {
  try {
    await axios.post(`${baseUrl}/api/vacancy`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default postVacancyThunk;
