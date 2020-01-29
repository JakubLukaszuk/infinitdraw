import * as actionTypes from './actionTypes';

export const startRoll = () => {
    return {type: actionTypes.START_ROLL}
}

export const stopRoll = () => {
    return {type: actionTypes.STOP_ROLL}
}

export const setDrawArrayAndResults = (rollsAmout) => {
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        let drawResult = [];

        for (let i = 0; i < rollsAmout; i++) {
            const index = Math.floor(Math.random() * options.length)
            const result = options[index]
            drawResult.push(result)
        }

        const simplifedResults = simplifyResults(drawResult);
        let multiplerResult=0;
        if (simplifedResults.length === new Set(simplifedResults).size) {
            multiplerResult = 1.4;
        }
        else{
            const allEqual = arr => arr.every( e => e === arr[0] )
            if (allEqual(simplifedResults)) {
                const goal  = simplifyResults[0];
                if (goal === 3) {
                    multiplerResult = 2;
                } else if (multiplerResult === 6) {
                    multiplerResult = 3;
                } else if (multiplerResult === 2) {
                    multiplerResult = 5;
                } else if (multiplerResult === 1) {
                    multiplerResult = 7;
                } else if (multiplerResult === 5) {
                    multiplerResult = 1;
                } else if (multiplerResult === 7) {
                    multiplerResult = 10;
                }
            }
        }
        return {type: actionTypes.SET_DRAW_ARRAY_AND_DRAW_RESULT, drawArray: drawResult, multipler: multiplerResult};
    }


const simplifyResults = (draw) => {
    for (let index = 0; index < draw.length; index++) {
        if (draw[index] === 4 || draw[index] === 8 || draw[index] === 11) draw[index] = 3;
        else if (draw[index] === 10 || draw[index] === 12) draw[index] = 6;
        else if (draw[index] === 9) draw[index] = 2;
    }
    return draw;
}