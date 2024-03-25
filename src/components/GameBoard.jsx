import { useState } from "react";

export default function GameBoard({ onSelectSqure, board}) {


    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button disabled={playerSymbol!==null} onClick={() => onSelectSqure(rowIndex,colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}