import * as actionTypes from '../actions/actionTypes';

const initialState = {
  rollsAmout: 0,
  money: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AMOUT_OF_ROLLS:
      return {
        ...state,
        rollsAmout: action.rollsAmout
      }
    case actionTypes.INCREASE_AMOUT_OF_ROLLS:
      return {
        ...state,
        rollsAmout: state.rollsAmout + action.rollsAmout
      }
    case actionTypes.DECREASE_AMOUT_OF_ROLLS:
      return {
        ...state,
        rollsAmout: state.rollsAmout - action.rollsAmout
      }
    case actionTypes.SET_MONEY:
      return {
        ...state,
        money: action.money
      }
    case actionTypes.INCREASE_AMOUT_OF_MONEY:
      return {
        ...state,
        money: state.money + action.money
      }
    case actionTypes.DECREASE_AMOUT_OF_MONEY:
      return {
        ...state,
        money: state.money - action.money
      }
    default:
      return state;
  }
}

export default reducer;