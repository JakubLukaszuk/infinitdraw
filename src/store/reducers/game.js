import * as actionTypes from '../actions/actionTypes';

const initialState = {
  rollsAmout: 0,
  money: 0,
  bid: 0,
  aveilableBids: [],
}

const reducer = (state = initialState, action) => {
  let finalMoney = 0;
  switch (action.type) {
      //money rolls and avaliableBids
    case actionTypes.SET_MONEY:
      if (action.money > 2000 && action.money < 4999) {
        return {
          ...state,
          rollsAmout: 4,
          money: action.money,
          aveilableBids: [20, 50, 100, 200]
        }
      }
      if (action.money > 4999) {
        return {
          ...state,
          rollsAmout: 5,
          money: action.money,
          aveilableBids: [50, 100, 200, 500]
        }
      }
      return {
        ...state,
        rollsAmout: 3,
        money: action.money,
        aveilableBids: [10, 20, 50]
      }

    case actionTypes.INCREASE_AMOUT_OF_MONEY:

      finalMoney = action.money + state.money;
      if (finalMoney > 2000 && finalMoney < 4999) {
        return {
          ...state,
          rollsAmout: 4,
          money: finalMoney,
          aveilableBids: [20, 50, 100, 200]
        }
      }
      if (finalMoney > 4999) {
        return {
          ...state,
          rollsAmout: 5,
          money: finalMoney,
          aveilableBids: [50, 100, 200, 500]
        }
      }
      return {
        ...state,
        rollsAmout: 3,
        money: finalMoney,
        aveilableBids: [10, 20, 50]
      }
    case actionTypes.DECREASE_AMOUT_OF_MONEY:

      finalMoney = action.money - state.money;
      if (finalMoney > 2000 && finalMoney < 4999) {
        return {
          ...state,
          rollsAmout: 4,
          money: finalMoney,
          aveilableBids: [20, 50, 100, 200]
        }
      }
      if (finalMoney > 4999) {
        return {
          ...state,
          rollsAmout: 5,
          money: finalMoney,
          aveilableBids: [50, 100, 200, 500]
        }
      }
      return {
        ...state,
        rollsAmout: 3,
        money: finalMoney,
        aveilableBids: [10, 20, 50]
      }
      //bids
    case actionTypes.SET_BID:
      return {
        ...state,
        bid: action.bid
      }

    default:
      return state;
  }
}

export default reducer;