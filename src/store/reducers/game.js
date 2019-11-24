import * as actionTypes from '../actions/actionTypes';

const initialState ={
    rollsAmout: 1,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AMOUT_OF_ROLLS:
            return{
                ...state,
                rollsAmout: action.rollsAmout
            }
        default:
            return state;
    }
}

export default reducer;