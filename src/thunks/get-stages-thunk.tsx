/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setStages } from '../store/vacancyRequestsSlice';

const getAllStagesThunk: AppThunk = () => async (dispatch) => {
  try {
    const stages = await axios.get(`${baseUrl}/api/stages/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  } catch (error) {
    console.log(error);
  }
};

export default getAllStagesThunk;
