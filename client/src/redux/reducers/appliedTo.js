import {GET_APPLIED_TO, APPLIED_ERROR, ADD_APPLIED_TO, CLEAR_APPLIED_TO} from '../actions/types';


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
        case ADD_APPLIED_TO:
            return{
                ...state,
                appliedToList: [payload, ...state.appliedToList],
                loading: false
            }
        case APPLIED_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }
        case CLEAR_APPLIED_TO:
            return{
                ...state,
                appliedToList: [],
                loading: true
            }
        default:
            return state;
    }
}