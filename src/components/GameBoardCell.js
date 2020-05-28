import React from "react";

const GameBoardCell = ({value, row, col, toggleValue}) => {

    return (
        <td className={value ? "alive" : "dead"} onClick={() => toggleValue(row, col)}></td>
    )
}

export default GameBoardCell;