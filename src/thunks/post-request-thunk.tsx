import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';

const postRequestsThunk: AppThunk = () => async (dispatch, getState) => {
  try {
    const request = getState().request.currentRequestData ?? {};
    console.log(request);
    await axios.post(`${baseUrl}/api/vacancyrequest`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default postRequestsThunk;
