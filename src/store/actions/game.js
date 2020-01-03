import * as actionTypes from './actionTypes';

export const setMoney = (money) => {
    return{type: actionTypes.SET_MONEY, money: money}
}

export const decraseMoney = (money) => {
    return {type: actionTypes.DECREASE_AMOUT_OF_MONEY, money: money}
}

export const increaseMoney = (money) => {
    return {type: actionTypes.INCREASE_AMOUT_OF_MONEY, money: money}
}

export const setBid = (bid) => {
    return {type: actionTypes.SET_BID, bid: bid}
}




