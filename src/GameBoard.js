import React from "react"
import './GameBoard.css';

function GameBoard(props) {
    return (
        <div>
            {
            props.rooms.map((row, i) => {
                return row.map((room, j) => {

                    let size = 10
                    const style={
                        left:`${room.x*size}%`,
                        top:`${room.y*size}%`,
                        width: `${size}%`,
                        height: `${size}%`
                    }
                    let className = "room"
                    if (room.open) {
                        className += " openRoom"
                    }
                    if (room.start) {
                        className += " startRoom"
                    }
                    else if (room.end) {
                        className += " endRoom"
                    }

                    let id = i.toString() + "," + j.toString()
                    
                    return(
                        <div className={className} key={id} style={style}></div>
                    )
                })
            })
            }
        </div>
    )
}
export default GameBoard