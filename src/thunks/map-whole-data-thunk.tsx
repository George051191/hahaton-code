/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setMappedData } from '../store/resumeSlice';
import { timer } from '../store/vacancyRequestsSlice';

const getAndSetDataToStandart: AppThunk = (id: number) => async (dispatch, getState) => {
  /*     const id = getState().request.currentRequestId;
        console.log(id) */
  try {
    dispatch(timer(false));
    const stages = await axios.get(`${baseUrl}/api/stages/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resumes = await axios.get(`${baseUrl}/api/resume/6`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const bundle = {} as { [key:string]:any };
    const wholeStages = stages.data.stages;

    for (let i = 0; i < wholeStages.length; i++) {
      const itemsArr = resumes.data.resume.map((el:any) => ({ itemName: el.name, status: 'ok', id: el.id }));
      const container = `container${i + 1}`;

      bundle[`container${i + 1}`] = {
        name: wholeStages[i].title,
        key: i + 1,
        items: wholeStages[i].title === 'Новый' ? itemsArr : [],
      };
    }

    batch(() => {
      dispatch(setMappedData(bundle));
    });
    dispatch(timer(true));
  } catch (error) {
    console.log(error);
  }
};

export default getAndSetDataToStandart;


