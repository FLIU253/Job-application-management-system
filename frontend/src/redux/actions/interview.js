import axios from 'axios';
import {GET_INTERVIEW, INTERVIEW_ERROR, ADD_INTERVIEW, CLEAR_INTERVIEW} from './types';
import {setAlert} from './alert';

//get all 'interview'
export const getInterview = () => async dispatch => {
    try{
        const res = await axios.get('/api/users/interview');

        dispatch({
            type: GET_INTERVIEW,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: INTERVIEW_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}

//add a post
export const addInterview = ({companyName, jobTitle, applicationUrl, location, interviewDate}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body= JSON.stringify({companyName, jobTitle, applicationUrl, location, interviewDate});

    try{
        const res = await axios.put('/api/users/interview', body, config);

        dispatch({
            type: ADD_INTERVIEW,
            payload: res.data
        });

        dispatch(setAlert('interview Added', 'success'));

    }catch(err){
        dispatch({
            type: INTERVIEW_ERROR,
            payload: {msg: err.response, status: err.response}
        });
    }
}

export const clearInterview = () => dispatch => {
    dispatch({type: CLEAR_INTERVIEW });
}