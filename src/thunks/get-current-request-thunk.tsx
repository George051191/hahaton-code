/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setCurrentRequest } from '../store/vacancyRequestsSlice';

const getCurrentRequestsThunk: AppThunk = (id: number) => async (dispatch, getState) => {
    try {
        const currentRequest = await axios.get(`${baseUrl}/api/vacancyrequest/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch(setCurrentRequest(currentRequest.data.vacancyRequest))
    } catch (error) {
        console.log(error);
    }
};

export default getCurrentRequestsThunk;