/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setStages } from '../store/vacancyRequestsSlice';

const getStagesThunk: AppThunk = (id: number) => async (dispatch) => {
  try {
    const stages = id == 23 || id == 19 ? await axios.get(`${baseUrl}/api/stages/all/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      : await axios.get(`${baseUrl}/api/stages/all/${id}`, {
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
