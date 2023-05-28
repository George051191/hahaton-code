/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setStages } from '../store/vacancyRequestsSlice';

const getStagesThunk: AppThunk = (id: number) => async (dispatch) => {
  try {
    let url = `${baseUrl}/api/stages/all`;
    if (id != 0) {
      url = `${url}/api/stages/all/${id}`;
    }

    const stages = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setStages(stages.data.stages));
  } catch (error) {
    console.log(error);
  }
};

export default getStagesThunk;
