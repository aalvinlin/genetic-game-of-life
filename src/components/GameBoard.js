import React, { useState, useEffect } from "react";
import GameBoardCell from "./GameBoardCell";

const GameBoard = ({rows, cols}) => {

    let [gameBoardData, setGameBoardData] = useState([]);
    let [isRunning, setIsRunning] = useState(false);
    let [currentGeneration, setCurrentGeneration] = useState(0);

    const startSimulation = () => {
        setIsRunning(true);
        runSimulation();
    }

    const stopSimulation = () => {
        setIsRunning(false);
    }

    const resetSimulation = () => {
        setIsRunning(false);
        setGameBoardData(createInitialState());
        setCurrentGeneration(0);
    }

    const advanceSimulation = () => {
        
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
                                        if (!(rowOffset === 0 && colOffset === 0))
                                            {
                                                if (gameBoardData[row + rowOffset] !== undefined
                                                        && gameBoardData[row + rowOffset][col + colOffset] !== undefined
                                                        && gameBoardData[row + rowOffset][col + colOffset])
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

        setGameBoardData(gameBoardBuffer);
        setCurrentGeneration(currentGeneration + 1);
        setIsRunning(true);

        return currentGeneration + 1;
    }

    const runSimulation = () => {

        let test = 0;

        console.log("running...", isRunning, test)

        while (test < 100)
            { console.log("generation", test); setTimeout(advanceSimulation(), 1000); test += 1; }
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

    
    const highlightCell = (event) => {

        // display highlight color only if the simulation isn't running
        if (!isRunning)
            {
                event.target.classList.add("hover")
            }
    }

    const removeHighlight = (event) => {

        // display/remove highlight color only if the simulation isn't running
        if (!isRunning)
            {
                event.target.classList.remove("hover")
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

    // useEffect(() => {
    //     if (isRunning)
    //         { setTimeout(advanceSimulation, 100); console.log("another round...")}
    // }, [isRunning])

    if (!gameBoardData)
        { return <h2>Loading game board...</h2>}

    return (
        <>
            <table className="gameboard">
                <tbody>
                    {
                        gameBoardData.map((row, rowID) => {
                            return (
                                <tr key={"row" + rowID}>
                                    {row.map((cell, colID) => <GameBoardCell value={cell} row={rowID} col={colID} toggleValue={toggleValue} highlightCell={highlightCell} removeHighlight={removeHighlight} key={"cell" + rowID + "_" + colID}/>)}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className="statusDiv">

                <div className="simulationStatus">
                    <p>Simulation is {isRunning ? "" : "not"} running.</p>
                </div>

                <div className="simulationButtons">
                    {isRunning ? <button className="stop" onClick={stopSimulation}>Stop</button> : <button className="start" onClick={startSimulation}>Start</button> }
                    <button className="next" onClick={advanceSimulation}>Next</button>
                    <button className="reset" onClick={resetSimulation}>Reset</button>
                </div>


                <div className="simulationGeneration">
                    {/* <p>{isRunning || currentGeneration > 0 ? "Current Generation: " + currentGeneration : ""}</p> */}
                    <p>Current Generation: {currentGeneration}</p>
                </div>

            </div>


        </>


    )

}

export default GameBoard;