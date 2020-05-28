import React, { useState, useEffect } from "react";
import GameBoardCell from "./GameBoardCell";

const GameBoard = ({rows, cols}) => {

    let [gameBoardData, setGameBoardData] = useState([]);
    let [isRunning, setIsRunning] = useState(false);
    let [currentGeneration, setCurrentGeneration] = useState(0);

    const startSimulation = () => {
        setIsRunning(true);
    }

    const stopSimulation = () => {
        setIsRunning(false);
    }

    const resetSimulation = () => {
        setIsRunning(false);
        setGameBoardData(createInitialState());
        setCurrentGeneration(0);
    }

    const runSimulation = () => {

        console.log("simulation is running...")

        const updateGameBoard = () => {
            // use a double buffer to update game board
            let gameBoardBuffer = gameBoardData.slice();

            // create a copy of all entries in the row
            for (let i = 0; i < gameBoardBuffer.length; i++)
                { gameBoardBuffer[i] = gameBoardData[i].slice(); }

            // determine how to update each cell in the game
            for (let row = 0; row < gameBoardBuffer.length; row++)
                {
                    for (let col = 0; col < gameBoardBuffer[0].length; col++)
                        {
                            let neighbors = 0;
                            let isAlive = gameBoardBuffer[row][col];

                            // check each of the 8 neighbors for the current cell
                            for (let rowOffset = -1; rowOffset <= 1; rowOffset++)
                                {
                                    for (let colOffset = -1; colOffset <= 1; colOffset++)
                                        {
                                            // ignore current square, but process all others
                                            if (rowOffset && colOffset)
                                                {
                                                    if (gameBoardBuffer[row + rowOffset] !== undefined && gameBoardBuffer[row + rowOffset][col + colOffset] !== undefined && gameBoardBuffer[row + rowOffset][col + colOffset])
                                                        { neighbors += 1; }
                                                }
                                        }
                                }

                            if (isAlive && (neighbors < 2 || neighbors > 3))
                                { gameBoardBuffer[row][col] = 0; }
                            
                            else if (!isAlive && neighbors === 3)
                                { gameBoardBuffer[row][col] = 1; }
                        }
                }

            console.log("udpated!");
            setGameBoardData(gameBoardBuffer);
            setCurrentGeneration(currentGeneration + 1);
        }

        console.log(isRunning, "????")

        if (isRunning && currentGeneration < 100)
            { console.log("generation", currentGeneration); setTimeout(updateGameBoard, 1000); }
        else
            { return; }
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

    useEffect(() => {
        if (isRunning)
            { runSimulation(); }
    }, [isRunning])

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