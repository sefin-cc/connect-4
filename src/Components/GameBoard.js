import React, {useEffect, useState} from "react";
import { GameCircle } from "./GameCircle";
import '../Game.css';
import Header from "./Header";
import Footer from "./Footer";
import { isWinner, isDraw, getComputerMove } from "../helper";
import { GAME_STATE_PLAYING, GAME_STATE_WIN, NO_PLAYER, PLAYER_1, PLAYER_2, NO_CIRCLES, GAME_STATE_DRAW} from "../Constants";



const GameBoard =() =>{
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const [currentPLayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

    useEffect (() =>{
        initGame();
    },[]);

    //intial default values
    const initGame = () =>{
        setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    }

    const initBoard = () => {
        const circles = [];
        for(let i = 0; i < NO_CIRCLES; i++){
            renderCircle(i);
            circles.push(renderCircle(i));
        }
        return circles;
    };

    const suggestMove =() =>{
        circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked = (id) =>{
        console.log("circle clicked:" + id);

        //Check if the circle has no player (haven't clicked on)
        if(gameBoard[id] !== NO_PLAYER) return;
        // Check if the game is over
        if(gameState !== GAME_STATE_PLAYING) return;

        // Check if the player has won
        if(isWinner(gameBoard, id, currentPLayer)){
            //Set the gamestate to win
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPLayer);
        }
        if(isDraw(gameBoard, id, currentPLayer)){
            //Set the gamestate to win
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }

        setGameBoard(prev =>{
            return prev.map((circle, pos) => {
                if(pos === id) return currentPLayer;
                return circle;
            });
        });
        setCurrentPlayer(currentPLayer === PLAYER_1 ? PLAYER_2: PLAYER_1);
    };
    
    const renderCircle = id =>{
        return  <GameCircle key={id} id={id}  className={`player${gameBoard[id]}`} onCircleClicked={circleClicked} />
    }

    return (
        <div className="items">
            <Header gameState={gameState}  currentPLayer={currentPLayer} winPlayer={winPlayer} />
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState} />
        </div>
   
    );
};

export default GameBoard;