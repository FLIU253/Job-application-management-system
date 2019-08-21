import {GET_REJECTED, REJECTED_ERROR, ADD_REJECTED} from '../actions/types';


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
        case ADD_REJECTED:
            return {
                ...state,
                rejectedList: [payload, ...state.rejectedList],
                loading: false
            }
        case REJECTED_ERROR:
            return {
                ...state,
                errors: payload,
                loading: true
            }
        default:
            return state;
    }
}