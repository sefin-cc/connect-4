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

    //intial default values, this is called in the start of the game (useEffect) or when the new game button is clicked
    const initGame = () =>{
        setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    }

    //generate the whole board (calls/generate renderCircle() and assigns its id and key)
    const initBoard = () => {
        const circles = [];
   
        for(let i = 0; i < NO_CIRCLES; i++){
            renderCircle(i);
            circles.push(renderCircle(i));
        }
        return circles;
    };
 
    const suggestMove =() =>{
        // will return an id suggested by the computer sent it to the circleClicked()
        circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked = (id) =>{

        // This wont let the player to override if there is already a player in the id
        // Will return if occupied 
        if(gameBoard[id] !== NO_PLAYER) return;
        // Check if the game is over
        if(gameState !== GAME_STATE_PLAYING) return;

        // Check if the player has won
        if(isWinner(gameBoard, id, currentPLayer)){
            //Set the gamestate to win
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPLayer);
        }

        // Check if draw condition is met
        if(isDraw(gameBoard, id, currentPLayer)){
            //Set the gamestate to draw
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }


        //update the value of the gameboard to the current player(if the id is the same position in the map),
        //if not it will just return the prev value (circle)
        setGameBoard(prev =>{
            return prev.map((circle, pos) => {
                if(pos === id) return currentPLayer;
                return circle;
            });
        });

        //change the currentplayer
        setCurrentPlayer(currentPLayer === PLAYER_1 ? PLAYER_2: PLAYER_1);
    };
    
    //This the individual circle, gets the id from the gameboard
    //The classname is dynamically changing depending on the value in the gameboard ( no player = 0, player1 = 1, player2 = 2)
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