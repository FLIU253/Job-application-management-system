import axios from 'axios';
import {GET_REJECTED, REJECTED_ERROR, ADD_REJECTED} from './types';
import {setAlert} from './alert';

//get all 'rejected'
export const getRejected = () => async dispatch => {
    try{
        const res = await axios.get('/api/users/rejected');

        dispatch({
            type: GET_REJECTED,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: REJECTED_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}
//add a post
export const addRejected = ({companyName, jobTitle, applicationUrl, location}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body= JSON.stringify({companyName, jobTitle, applicationUrl, location});

    try{
        const res = await axios.put('/api/users/rejected', body, config);

        dispatch({
            type: ADD_REJECTED,
            payload: res.data
        });

        dispatch(setAlert('rejected Added', 'success'));

    }catch(err){
        dispatch({
            type: REJECTED_ERROR,
            payload: {msg: err.response, status: err.response}
        });
    }
}