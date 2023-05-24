/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setAllRequests } from '../store/vacancyRequestsSlice';

const getAllRequestsThunk: AppThunk = () => async (dispatch) => {
  try {
    const requests = await axios.get(`${baseUrl}/api/vacancyrequest/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setAllRequests(requests.data));
  } catch (error) {
    console.log(error);
  }
};

export default getAllRequestsThunk;
