import * as actionTypes from '../actions/actionTypes';

const initialState = {
  drawArray: []
}

const reducer = (state = initialState, action) => {
  let finalMoney = 0;
  switch (action.type) {
      //money rolls and avaliableBids
    case actionTypes.SET_MONEY:
        return {
          ...state,
          drawArray: action.drawArray
      }

    default:
      return state;
  }
}

export default reducer;