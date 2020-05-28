import React from "react";

const GameBoardCell = ({value, row, col, toggleValue}) => {

    return (
        <td onClick={() => toggleValue(row, col)}>{value}</td>
    )
}

export default GameBoardCell;