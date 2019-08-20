import axios from 'axios';
import {GET_INTERVIEW, INTERVIEW_ERROR} from './types';


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