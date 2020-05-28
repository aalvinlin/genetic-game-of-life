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
                    gameBoardData.map(row => {
                        return (
                            <tr>
                                {row.map(cell => <GameBoardCell value={cell} />)}
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