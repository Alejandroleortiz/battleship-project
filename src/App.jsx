import { useState } from 'react'
import { MOVE, SHIPS, SHIP_ICON, flatGameBoard, SHIP_ICON_PC } from './components/constans'
import { Square } from './components/Square'



function App() {

  const [board, setBoard] = useState(flatGameBoard)
  const [computerBoard, setComputerBoard] = useState(flatGameBoard)
  const [move, setMove] = useState(MOVE.hit)
  const [orientation, setOrientation] = useState(false);
  const [shipNumber, setShipNumber] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [playerFleet, setPlayerFleet] = useState(SHIPS);
  const [selectedShip, setSelectedShip] = useState(null);

  const allShipsPlaced = () => {
    return playerFleet.every(ship => !ship.available); //Verifica que todos los barcos esten False
  };


  const startGame = () => {
    if (allShipsPlaced()) {
      setGameStarted(true)
      placeComputerShips();
      console.log("El juego ha empezado!");
    };
  }


  const selectShip = (index) => {
    setSelectedShip(playerFleet[index])
    setShipNumber(index)
  }


  const changeOrientation = () => {
    setOrientation(!orientation)
  }

  const checkWinner = () => {
    alert("Felicidades, ganaste!")
  }



  const updateComputerBoard = (index) => {
    const newComputerBoard = [...computerBoard];

    if (newComputerBoard[index] === 0) {
      newComputerBoard[index] = MOVE.empty;
    } else if (newComputerBoard[index] === SHIP_ICON_PC) {
      newComputerBoard[index] = MOVE.hit;
    }
    setComputerBoard(newComputerBoard);


    const shipsRemaining = newComputerBoard.map((value, index) => [value, index]).filter(([value]) => value === SHIP_ICON_PC)
      .map(([, index]) => index);

      if(shipsRemaining.length === 0) {
        checkWinner()
      }

    if (gameStarted) {
      computerMove();
    }
  }


  const updateUserBoard = (index) => {
    const newUserBoard = [...board];

    if (newUserBoard[index] === 0) {
      newUserBoard[index] = MOVE.empty;
    } else if (newUserBoard[index] === SHIP_ICON) {
      newUserBoard[index] = MOVE.hit;
    }
    setBoard(newUserBoard);

    const shipsRemaining = newUserBoard.map((value, index) => [value, index]).filter(([value]) => value === SHIP_ICON)
      .map(([, index]) => index);

    if(shipsRemaining.length === 0) {
      checkWinner()
    }
  }


  const computerMove = () => {
    const emptySquares = board
      .map((value, index) => [value, index])
      .filter(([value]) => value !== '💥' && value !== '💦')
      .map(([, index]) => index);

    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      updateUserBoard(emptySquares[randomIndex]);

    }
  };

  const placeComputerShips = () => {
    let newComputerBoard = [...computerBoard];
    let computerFleet = [...playerFleet];

    for (let ship of computerFleet) {
      let placed = false;

      while (!placed) {
        let orientation = Math.floor(Math.random() * 2) === 0; // 0 = horizontal, 1 = vertical
        let randomIndex = Math.floor(Math.random() * newComputerBoard.length);

        if (orientation) {
          if (randomIndex % 10 + ship.shipLength <= 10) { //verificar posición del barco horizontal
            let empty = true;
            for (let i = 0; i < ship.shipLength; i++) {
              if (newComputerBoard[randomIndex + i] !== 0) {
                empty = false;
                break;
              }
            }
            if (empty) {
              for (let i = 0; i < ship.shipLength; i++) {
                newComputerBoard[randomIndex + i] = SHIP_ICON_PC;
              }
              placed = true;
            }
          }
        } else {
          if (Math.floor(randomIndex / 10) + ship.shipLength <= 10) { // verificar posición del barco vertical
            let empty = true;
            for (let i = 0; i < ship.shipLength; i++) {
              if (newComputerBoard[randomIndex + i * 10] !== 0) {
                empty = false;
                break;
              }
            }
            if (empty) {
              for (let i = 0; i < ship.shipLength; i++) {
                newComputerBoard[randomIndex + i * 10] = SHIP_ICON_PC;
              }
              placed = true;
            }
          }
        }
      }
    }

    setComputerBoard(newComputerBoard);
  }


  const updateBoard = (index) => {

    const newBoard = [...board]

    if (selectedShip) {


      for (let i = 0; i < selectedShip.shipLength; i++) {

        if (orientation) {
          if (newBoard[index + i] === 0) {  // Asignar la posición del barco en el tablero
            newBoard[index + i] = SHIP_ICON;
          } else {
            alert("No se puede colocar el barco aquí")  // Evitar la superposición de barcos
            return
          }
        }
        else if (!orientation) {
          if (newBoard[index + i * 10] === 0) {  // Asignar la posición del barco en el tablero
            newBoard[index + i * 10] = SHIP_ICON;
          } else {
            alert("No se puede colocar el barco aquí")  // Evitar la superposición de barcos
            return
          }
        }
      }

      SHIPS[shipNumber].available = false;
      setShipNumber(null)

      setSelectedShip(null)

      setPlayerFleet(SHIPS)

    } else {
      if (newBoard[index] === SHIP_ICON) {  // 1 representa un barco
        newBoard[index] = MOVE.hit;
      } else if (newBoard[index] === 0) {  // 0 representa empty
        newBoard[index] = MOVE.empty;
      }
      const shipMove = move === MOVE.hit ? MOVE.empty : MOVE.hit //logica para actualizar el tipo de movimiento que acabo de utilizar
      setMove(shipMove)
    }
    setBoard(newBoard)
  }




  return (
    <main className='board'>
      <h1>Battleship</h1>

      <div className="game-container">
        {/* <h2>{CURRENT_PLAYER.player}'s Board</h2> */}
        <section className="game">

          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                  value={board[index]}  // Pasar el valor del tablero como una prop
                >

                </Square>
              )
            })
          }
        </section>
        {/* <h2>{CURRENT_PLAYER.computer}'s Board</h2> */}
        <section className="game">

          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateComputerBoard}
                  value={computerBoard[index]}  // Pasar el valor del tablero como una prop
                >

                </Square>
              )
            })
          }
        </section>
      </div>

      <section className='ships'>

        {playerFleet.map((ship, index) => (
          <div key={index} className={ship.available ? 'ship-container' : 'no-clickable'} onClick={() => selectShip(index)}>
            <h3>{ship.name}</h3>
            <div className='ship-representation'>
              {Array(ship.shipLength).fill(null).map((_, i) => <div key={i} className='ship-part'></div>)}
            </div>
          </div>
        ))}
      </section>
      {allShipsPlaced() ? <button onClick={startGame}>START</button> : <button onClick={() => changeOrientation()}>{orientation ? "HORIZONTAL" : "VERTICAL"}</button>}
    </main>

  )
}

export default App
