export const CURRENT_PLAYER = {
    player: "You",
    computer: "Computer"
  }
  
export const GAME_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  export var SHIPS = [
    {
      name: "carrier",
      shipLength: 5,
      available: true,
    },
    {
      name: "battleship",
      shipLength: 4,
      available: true,
    },
    {
      name: "cruiser",
      shipLength: 3,
      available: true,
    },
    {
      name: "destroyer",
      shipLength: 2,
      available: true,
    }
  ];
  
 export const flatGameBoard = GAME_BOARD.flat();
  
 export const MOVE = {
    hit: '💥',
    empty: '💦'
  }
  
  
export const SHIP_ICON = '🚢';
export const SHIP_ICON_PC = 1;