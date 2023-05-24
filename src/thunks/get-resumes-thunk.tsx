/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setAllResumes } from '../store/resumeSlice';

const getAllResumesThunk: AppThunk = () => async (dispatch) => {
  try {
    const resumes = await axios.get(`${baseUrl}/api/resume/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setAllResumes(resumes.data));
  } catch (error) {
    console.log(error);
  }
};

export default getAllResumesThunk;