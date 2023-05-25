/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.type';
import { baseUrl, token } from '../services/constants/api-constants';
import { setAllDepartments, setAllSystemsUsers, setCurrentUser } from '../store/userAndOrganizationSlice';

const getAllThunk: AppThunk = () => async (dispatch) => {
    try {
        const user = await axios.get(`${baseUrl}/api/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const allUsers = await axios.get(`${baseUrl}/api/user/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const allDepartments = await axios.get(`${baseUrl}/api/department/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        batch(() => {
            dispatch(setAllDepartments(allDepartments.data.departments));
            dispatch(setAllSystemsUsers(allUsers.data.users));
            dispatch(setCurrentUser(user.data));
        });
    } catch (error) {
        console.log(error);
    }
};

export default getAllThunk;
