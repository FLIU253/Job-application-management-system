import {GET_TO_APPLY, TO_APPLY_ERROR, ADD_TO_APPLY, DELETE_TO_APPLY, CLEAR_TO_APPLY} from '../actions/types';


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
        case DELETE_TO_APPLY:
            return{
                ...state,
                toApplyList: state.toApplyList.filter(item => item._id !== payload),
                loading: false
            }
        case TO_APPLY_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }
        case CLEAR_TO_APPLY:
            return{
                ...state,
                toApplyList: [],
                loading: true
            }
        default:
            return state;
    }
}