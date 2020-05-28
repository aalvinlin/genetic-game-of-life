import React, { useState, useEffect } from "react";
import GameBoardCell from "./GameBoardCell";

const GameBoard = ({rows, cols}) => {

    let [gameBoardData, setGameBoardData] = useState([]);
    let [isRunning, setIsRunning] = useState(false);

    const startSimulation = () => {
        setIsRunning(true);
    }

    const stopSimulation = () => {
        setIsRunning(false);
    }

    const resetSimulation = () => {
        setIsRunning(false);
        setGameBoardData(createInitialState());
    }

    const toggleValue = (row, col) => {

        // allow user to toggle value only if the simulation isn't running
        if (!isRunning)
            {
                // create a copy of the gameboard to avoid mutating state
                let gameBoardCopy = gameBoardData.slice();

                // create a copy of all entries in the row
                for (let i = 0; i < gameBoardCopy.length; i++)
                    { gameBoardCopy[i] = gameBoardData[i].slice(); }

                // update the value of the requested cell
                gameBoardCopy[row][col] = (gameBoardCopy[row][col] === 1) ? 0 : 1;

                setGameBoardData(gameBoardCopy);
            }
    }

    const createInitialState = () => {

        let gameBoard = [];
        let row = [];

        // initialize a row to all zeroes
        for (let i = 0; i < cols; i++)
            { row.push(0); }
        
        // add rows to gameboard
        for (let i = 0; i < rows; i++)
            { gameBoard.push(row); }

        return gameBoard;

    }

    // initialize cellData to the specified number of rows and columns
    useEffect(() => {
        setGameBoardData(createInitialState());
    }, []);

    if (!gameBoardData)
        { return <h2>Loading game board...</h2>}

    return (
        <>
            <h1>GameBoard</h1>

            <table>
                {
                    gameBoardData.map((row, rowID) => {
                        return (
                            <tr>
                                {row.map((cell, colID) => <GameBoardCell value={cell} row={rowID} col={colID} toggleValue={toggleValue} />)}
                            </tr>
                        )
                    })
                }
            </table>

            <div className="buttons">
                {isRunning ? <button className="stop" onClick={stopSimulation}>Stop</button> : <button className="start" onClick={startSimulation}>Start</button> }
                <button className="reset" onClick={resetSimulation}>Reset</button>
            </div>

            <div className="statusMessages">
                Simulation is {isRunning ? "" : "not"} running.
            </div>


        </>


    )

}

export default GameBoard;