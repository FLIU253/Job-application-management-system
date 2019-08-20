import {GET_APPLIED_TO, APPLIED_ERROR} from '../actions/types';


const initialState = {
    appliedToList: [],
    loading: true,
    errors: {}
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_APPLIED_TO:
            return {
                ...state,
                appliedToList: payload,
                loading: false
            }
        case APPLIED_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }
        default:
            return state;
    }
}