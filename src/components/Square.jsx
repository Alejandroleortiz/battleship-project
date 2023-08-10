import { SHIP_ICON, MOVE } from "./constans";
export const Square = ({ updateBoard, index, value }) => {

  const handleClick = () => {
    updateBoard(index)
  }

  let displayValue = "";
  if (value === SHIP_ICON) {
    displayValue = SHIP_ICON; // Icono del barco.
  } else if (value === MOVE.hit) {
    displayValue = "💥"; // Icono de acierto.
  } else if (value === MOVE.empty) {
    displayValue = "💦"; // Icono de agua.
  }

  return (
    <div onClick={handleClick} className="square">
      <span className='board-value'>{displayValue}</span>
    </div>
  )
}