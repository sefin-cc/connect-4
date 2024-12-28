import React from 'react'
import Confetti from 'react-confetti-boom';
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN } from "../Constants";

const Header = ({gameState, currentPLayer, winPlayer}) => {

    const renderLabel =() => {
        switch (gameState) {
            case GAME_STATE_PLAYING:
                return <div>PLAYER {currentPLayer} TURN</div>
            case GAME_STATE_WIN :
                return <div>PLAYER {winPlayer} WINS! <Confetti spreadDeg={50} launchSpeed={2} shapeSize={30} particleCount={100}/></div> 
            case GAME_STATE_DRAW :
                    return <div>DRAW!</div>
            default:
        }
    }

    return (
        <div className='header'>
            <div className='header-text'>{renderLabel()}</div>
        </div>
    )
}

export default Header