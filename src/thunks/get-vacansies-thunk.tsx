/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setVacancies, setCurrentVacancyArray } from '../store/vacancyRequestsSlice';

const getAllVacanciesThunk: AppThunk = () => async (dispatch) => {
  try {
    const vacansies = await axios.get(`${baseUrl}/api/vacancy/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setCurrentVacancyArray(vacansies.data.vacancies));
    dispatch(setVacancies(vacansies.data.vacancies))
  } catch (error) {
    console.log(error);
  }
};

export default getAllVacanciesThunk;