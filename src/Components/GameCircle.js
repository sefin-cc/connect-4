import React from 'react'
import '../Game.css';


export const GameCircle = ({id, className, onCircleClicked}) => {
  return (
    // set the className
    // If this circle is clicked, circleClicked() will be called (the id of the circle will be also passed as an identifier)
    <div className={`gameCircle ${className} `} onClick={()=>{onCircleClicked(id)}}></div>
   
  )
}
