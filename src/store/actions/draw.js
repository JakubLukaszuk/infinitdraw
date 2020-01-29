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

        simplifyResults(drawResult);
        let uniqueResultsSize = new Set(drawResult).size;
        let multiplerResult = 0;
        console.log(uniqueResultsSize);
        if (drawResult.length === uniqueResultsSize) {
            multiplerResult = 1.4;
        }
        console.log(uniqueResultsSize === 1);
        if (uniqueResultsSize === 1) {
            console.log('aa '+uniqueResultsSize);
                const goal = drawResult[0];

                if (goal === 3) {
                    multiplerResult = 2;
                } else if (goal === 6) {
                    multiplerResult = 3;
                } else if (goal === 2) {
                    multiplerResult = 5;
                } else if (goal === 1) {
                    multiplerResult = 7;
                } else if (goal === 5) {
                    multiplerResult = 1;
                } else if (goal === 7) {
                    multiplerResult = 10;
                }
            }
            console.log(multiplerResult);
        return {type: actionTypes.SET_DRAW_ARRAY_AND_DRAW_RESULT, drawArray: drawResult, multipler: multiplerResult};
    }


const simplifyResults = (draw) => {
    for (let index = 0; index < draw.length; index++) {
        if (draw[index] === 4 || draw[index] === 8 || draw[index] === 11) draw[index] = 3;
        else if (draw[index] === 10 || draw[index] === 12) draw[index] = 6;
        else if (draw[index] === 9) draw[index] = 2;
    }
    console.log("Simple: "+draw);
    return draw;
}