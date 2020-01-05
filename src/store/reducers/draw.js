import * as actionTypes from '../actions/actionTypes';

const initialState = {
  rollMove: false,
  drawArray: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_ROLL:
        console.log("xD");
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