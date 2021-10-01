import React, { useState, useEffect, ChangeEventHandler } from 'react';
import Board from '../Board/Board'
import StatusText from '../StatusText/StatusText';
import PlayerControllerRadio from '../PlayerControllerRadio/PlayerControllerRadio'
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import calculateWinner from '../../util/calculateWinner';
import ArtificialIntelligence from '../../util/AI';
import BoardState from '../../classes/Board'
import Player from '../../classes/Player';
import { AIOptions } from '../../types';

import Test from '../../classes/test'

export default function Game() {
    const [willAutoReset, setWillAutoReset] = useState(false)
    const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const [xController, setXController] = useState<AIOptions>("👨‍💻")
    const [oController, setOController] = useState<AIOptions>("👨‍💻")
    const [score, setScore] = useState({ X: 0, O: 0, Cat: 0 });
    const winner = calculateWinner(board);

    const test = () => {
        // const boardState = board.map((x) => x ? x : "")
        const gameState = new BoardState()
        const player = new Player("X"); // xIsNext ? "X" : "O"
        const best = player.getBestMove(gameState, true)
        console.log(best)
        console.log(player.nodesMap)
    }
    useEffect(() => {
        test()
    }, [])

    const handleClick = (i: number) => {
        const boardCopy = [...board];
        // If user click an occupied square or if game is won, return
        if (winner || boardCopy[i]) return;
        // Put an X or an O in the clicked square
        boardCopy[i] = xIsNext ? "X" : "O";
        setBoard(boardCopy);
        setXisNext(!xIsNext);
    };

    const handleToggleWillAutoReset = () => {
        setWillAutoReset(!willAutoReset)
    }

    const handleChangeXController: ChangeEventHandler<HTMLInputElement> = (e) => { setXController(e.target.value as AIOptions) }
    const handleChangeOController: ChangeEventHandler<HTMLInputElement> = (e) => { setOController(e.target.value as AIOptions) }

    // AI
    useEffect(() => {
        const controller = xIsNext ? xController : oController;
        switch (controller) {
            case "👨‍💻":
                break;
            case "🍌":
                ArtificialIntelligence(handleClick, board, xIsNext);
                break;
            case "🧠":
                const gameState = new BoardState(board.map((x) => x ? x : ""))
                const player = new Player(xIsNext ? "X" : "O");
                player.getBestMove(gameState, true, handleClick)
                break;
            default:
                break;
        }
    }, [xIsNext, score, xController, oController, handleClick])

    useEffect(() => {
        if (willAutoReset) setTimeout(resetBoard, 0)
    }, [winner, willAutoReset])

    const resetBoard = () => {
        setBoard(Array(9).fill(null))
        setXisNext(true)
        if (winner) setScore({ ...score, [winner]: score[winner] + 1 })
    }

    return (
        <>
            <Board squares={board} onClick={handleClick} />
            <StatusText winner={winner} xIsNext={xIsNext} resetBoard={resetBoard} />
            <form>
                <label > Auto Reset
                    <input type="checkbox" checked={willAutoReset} onChange={handleToggleWillAutoReset} />
                </label>
                <div>
                    <PlayerControllerRadio player="X" controller={xController} handleChangeController={handleChangeXController} />
                    <PlayerControllerRadio player="O" controller={oController} handleChangeController={handleChangeOController} />
                </div>
                <ScoreBoard score={score} />
            </form>

        </>
    )
}
