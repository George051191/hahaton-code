/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import {
  setAllRequests, setCurrentRequesrArray, setCurrentVacancyArray, setVacancies,
} from '../store/vacancyRequestsSlice';

const deleteVacancyThunk: AppThunk = (id: number) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/api/vacancy`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const requests = await axios.get(`${baseUrl}/api/vacancy/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    batch(() => {
      dispatch(setCurrentVacancyArray(requests.data.vacancies));

      dispatch(setVacancies(requests.data.vacancies));
    });
  } catch (error) {
    console.log(error);
  }
};

export default deleteVacancyThunk;
