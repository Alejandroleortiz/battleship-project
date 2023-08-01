export const Square = ({ children, updateBoard, index, value }) => {

    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className="square">
        <span className='board-value'>{value}</span>
      </div>
    )
  }