import * as actionTypes from '../actions/actionTypes';

const initialState = {
  rollMove: false,
  drawArray: [],
  multipler: null
}

const reducer = (state = initialState, action) => {
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
    case actionTypes.SET_DRAW_ARRAY_AND_DRAW_RESULT:
      return {
        ...state,
        drawArray: action.drawArray,
        multipler: action.multipler
      }

    default:
      return state;
  }
}

export default reducer;