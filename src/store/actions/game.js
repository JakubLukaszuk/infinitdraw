import * as actionTypes from './actionTypes';

export const setAmoutOfRolls = (amoutOfRolls) =>{
    return{type: actionTypes.SET_AMOUT_OF_ROLLS, rollsAmout: amoutOfRolls}
}

export const increaseAmoutOfRolls = () => {
    return {type: actionTypes.INCREASE_AMOUT_OF_ROLLS, rollsAmout: 1}
}

export const decreaseAmoutOfRolls = () => {
    return {type: actionTypes.DECREASE_AMOUT_OF_ROLLS, rollsAmout: 1}
}

export const setMoney = (money) => {
    return{type: actionTypes.SET_MONEY, money: money}
}

export const decraseMoney = (money) => {
    return {type: actionTypes.DECREASE_AMOUT_OF_MONEY, money: money}
}

export const increaseMoney = (money) => {
    return {type: actionTypes.INCREASE_AMOUT_OF_MONEY, money: money}
}



