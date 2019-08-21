import {GET_TO_APPLY, TO_APPLY_ERROR, ADD_TO_APPLY} from '../actions/types';


const initialState = {
    toApplyList: [],
    loading: true,
    errors: {}
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_TO_APPLY:
            return {
                ...state,
                toApplyList: payload,
                loading: false
            }
        case ADD_TO_APPLY:
            return{
                ...state,
                toApplyList: [payload, ...state.toApplyList],
                loading: false
            }
        case TO_APPLY_ERROR:
            return {
                ...state,
                errors: payload,
                loading: true
            }
        default:
            return state;
    }
}