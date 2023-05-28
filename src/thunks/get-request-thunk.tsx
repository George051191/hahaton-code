/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setAllRequests, setCurrentRequesrArray } from '../store/vacancyRequestsSlice';

const getAllRequestsThunk: AppThunk = () => async (dispatch) => {
  try {
    const requests = await axios.get(`${baseUrl}/api/vacancyrequest/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    batch(() => {
      dispatch(setAllRequests(requests.data.vacancyRequests));
      dispatch(setCurrentRequesrArray(requests.data.vacancyRequests));
    });
  } catch (error) {
    console.log(error);
  }
};

export default getAllRequestsThunk;
