import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import { WINNING_COMBINATIONS } from "./winning-combinations"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const derivedActivePlayer = (gameTurns) => {
  let currPlayer = 'x';
  if(gameTurns.length > 0 && gameTurns[0].player === 'x') {
    currPlayer = 'o'; 
  }

  return currPlayer;
}

const deriveWinner = (gameBoard, players) => {
  let winner;
  let firstSqureSymbol;
  let secondSqureSymbol;
  let thirdSqureSymbol;

  for (const combination of WINNING_COMBINATIONS) {
    firstSqureSymbol = gameBoard[combination[0].row][combination[0].col];
    secondSqureSymbol = gameBoard[combination[1].row][combination[1].col];
    thirdSqureSymbol = gameBoard[combination[2].row][combination[2].col];
    if (firstSqureSymbol && firstSqureSymbol === secondSqureSymbol && firstSqureSymbol === thirdSqureSymbol) {

      winner = players[firstSqureSymbol];
    }
    
  }

  return winner;

}

const derivedGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns) {
      const { squre, player } = turn;
      const { row, col } = squre;
      gameBoard[row][col] = player;

  }
  return gameBoard;
}

function App() {

 
  

  const [players, setPlayers] = useState({
    x : 'Player 1',
    o : 'Player 2',
  })

  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);

  const winner =  deriveWinner(gameBoard, players)
 
  const hasDraw = gameTurns.length === 9 && !winner;
 
  const handleSelectSqure = (rowIndex, colIndex) => {
    setGameTurns((preTurns) => {
      const currentPlayer = derivedActivePlayer(preTurns);
      const updatedTurns = [
        {
          squre : {
            row : rowIndex, col : colIndex
          },
          player : currentPlayer
        }
        ,...preTurns
      ];

      return updatedTurns;
    })
  }

  const handleRestart = () => {
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, newName) => {
      setPlayers(prevPlayers => {
        return {...prevPlayers,[symbol] : newName}
      });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={players.x} symbol="x" isActive={activePlayer === 'x'} onChangeName={handlePlayerNameChange}  />
          <Player initialName={players.o} symbol="o" isActive={activePlayer === 'o'} onChangeName={handlePlayerNameChange}  />
        </ol>


        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSqure={handleSelectSqure} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
