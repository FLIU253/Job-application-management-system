import {GET_REJECTED, REJECTED_ERROR} from '../actions/types';


const initialState = {
    rejectedList: [],
    loading: true,
    errors: {}
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_REJECTED:
            return {
                ...state,
                rejectedList: payload,
                loading: false
            }
        case REJECTED_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }
        default:
            return state;
    }
}