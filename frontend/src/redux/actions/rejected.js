import axios from 'axios';
import {GET_REJECTED, REJECTED_ERROR} from './types';


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