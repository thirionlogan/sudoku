import React, { useState, useEffect } from 'react';
import calculateWinner from '../../util/calculateWinner';
import Board from '../Board/Board'
import ArtificialIntelligence from '../../util/AI';

export default function Game() {
    const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const [xIsPlayer, setXIsPlayer] = useState(true);
    const [oIsPlayer, setOIsPlayer] = useState(true);
    const [score, setScore] = useState({ X: 0, O: 0, Cat: 0 });
    const winner = calculateWinner(board);

    const handleClick = (i: number) => {
        const boardCopy = [...board];
        // If user click an occupied square or if game is won, return
        if (winner || boardCopy[i]) return;
        // Put an X or an O in the clicked square
        boardCopy[i] = xIsNext ? "X" : "O";
        setBoard(boardCopy);
        setXisNext(!xIsNext);
    };

    const handleToggleOIsPlayer = () => {
        setOIsPlayer(!oIsPlayer)
    }

    const handleToggleXIsPlayer = () => {
        setXIsPlayer(!xIsPlayer)
    }

    // AI
    useEffect(() => {
        if ((xIsNext && xIsPlayer) || (!xIsNext && oIsPlayer)) return;
        ArtificialIntelligence(handleClick, board, xIsNext)
    }, [xIsNext, oIsPlayer, xIsPlayer])

    useEffect(() => {
        if (winner) {
            setScore({ ...score, [winner]: score[winner] + 1 })
        }
    }, [winner])

    const resetBoard = () => {
        setBoard(Array(9).fill(null))
        setXisNext(true)
    }

    const statusText = () => {
        if (winner) {
            return <><p>{"Winner: " + winner}</p><button onClick={resetBoard}>New Game</button></>
        } else if (xIsNext) {
            return <p>{"Next Player: X"}</p>
        } else {
            return <p>{"Next Player: O"}</p>
        }
    }

    return (
        <>
            <Board squares={board} onClick={handleClick} />
            <div>

                {statusText()}

            </div>
            <form>
                <label > X is Player
                    <input type="checkbox" checked={xIsPlayer} onChange={handleToggleXIsPlayer} />
                </label>
                <label > O is Player
                    <input type="checkbox" checked={oIsPlayer} onChange={handleToggleOIsPlayer} />
                </label>
                <p >{`X Wins: ${score.X}`}</p>
                <p >{`O Wins: ${score.O}`}</p>
                <p >{`Ties: ${score.Cat}`}</p>
            </form>

        </>
    )
}
