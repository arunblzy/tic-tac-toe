export default function Log({turns}) {
    console.log(turns);
    return <ol id="log">
            {turns.map((turn) => {
                return <li key={`${turn.squre.row}${turn.squre.col}`}>
                            {turn.player} selected {turn.squre.row},{turn.squre.col}
                        </li>
            })}
        </ol>
}