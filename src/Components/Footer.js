import React from 'react'
import { GAME_STATE_PLAYING } from '../Constants';

const Footer = ({onNewGameClick, onSuggestClick, gameState}) => {
  const renderButtons = () => {
    if(gameState === GAME_STATE_PLAYING){
      return <button onClick={onSuggestClick}>SUGGEST</button>
    }
    return <button onClick={onNewGameClick}>NEW GAME</button>
   
  }
  return (
    <div className='footer'>
      {renderButtons()}     
    </div>
  )
}

export default Footer;