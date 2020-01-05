import * as actionTypes from '../actions/actionTypes';

const initialState = {
  rollMove: false,
  drawArray: [],
}

const reducer = (state = initialState, action) => {
  let finalMoney = 0;
  switch (action.type) {
    case actionTypes.START_ROLL:
      return {
        ...state,
        rollMove: true
      }
    case actionTypes.STOP_ROLL:
      return {
        ...state,
        rollMove: false
      }
      //money rolls and avaliableBids
    case actionTypes.SET_DRAW_ARRAY:
      return {
        ...state,
        drawArray: action.drawArray
      }

    default:
      return state;
  }
}

export default reducer;