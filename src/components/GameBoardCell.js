import React from "react";

const GameBoardCell = ({value, row, col, toggleValue, highlightCell, removeHighlight}) => {

    return (
        <td className={value ? "alive" : "dead"} onClick={() => toggleValue(row, col)} onMouseOver={highlightCell} onMouseOut={removeHighlight}></td>
    )
}

export default GameBoardCell;