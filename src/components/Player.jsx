
import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing(ed => !ed);
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    const handleOnChange = (event) => {
        setPlayerName(event.target.value);
    }

    let playerField = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        playerField = <input type="text" onChange={handleOnChange} value={playerName}></input>;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerField}
            
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{ isEditing === true ? 'Save' : 'Edit' }</button>
      </li>
    );
}