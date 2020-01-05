import * as actionTypes from './actionTypes';

export const startRoll = () => {
    return {type: actionTypes.START_ROLL}
}

export const stopRoll = () => {
    return {type: actionTypes.STOP_ROLL}
}

export const setDrawArray = (rollsAmout) => {
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        let drawResult = [];

        for (let i = 0; i < rollsAmout; i++) {
            const index = Math.floor(Math.random() * options.length)
            const result = options[index]
            drawResult.push(result)
        }
        return {type: actionTypes.SET_DRAW_ARRAY, drawArray: drawResult};
    }

export const getDrawResult = () => {

}

const simplifyResults = (draw) => {
    for (let index = 0; index < draw.length; index++) {
        if (draw[index] === 4 || draw[index] === 8 || draw[index] === 11) draw[index] = 3;
        else if (draw[index] === 10 || draw[index] === 12) draw[index] = 6;
        else if (draw[index] === 9) draw[index] = 2;
    }
    return draw;
}