import React, { useState, useEffect } from "react";

const GameBoard = ({rows, cols}) => {

    let {gameBoardData, setGameBoardData} = useState([]);

    // initialize cellData to the specified number of rows and columns
    useEffect(() => {

        let gameBoard = [];
        let row = [];

        // initialize a row to all zeroes
        for (let i = 0; i < cols; i++)
            { row.push(0); }
        
        // add rows to gameboard
        for (let i = 0; i < rows; i++)
            { gameBoard.push(row); }

        setGameBoardData(gameBoard);        

    }, []);

    return (
        <>
            <h1>GameBoard</h1>

            <table>
                
            </table>


        </>


    )

}

export default GameBoard;