/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setVacancies, setCurrentVacancyArray } from '../store/vacancyRequestsSlice';
import { setCurrentIdVacancy } from '../store/resumeSlice';

const getVacancyThunk: AppThunk = (id:number) => async (dispatch) => {
  try {
    const vacansies = await axios.get(`${baseUrl}/api/vacancy?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setCurrentIdVacancy(vacansies.data.vacancy));
  } catch (error) {
    console.log(error);
  }
};

export default getVacancyThunk;
