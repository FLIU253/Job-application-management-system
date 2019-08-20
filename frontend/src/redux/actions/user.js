import axios from 'axios';
import {GET_TO_APPLY, TO_APPLY_ERROR} from './types';


//get all 'to apply'
export const getToApply = () => async dispatch => {
    try{
        const res = await axios.get('/api/users/toApply');

        dispatch({
            type: GET_TO_APPLY,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: TO_APPLY_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}