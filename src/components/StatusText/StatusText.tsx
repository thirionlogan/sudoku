import React from 'react';

interface Props {
    winner: "X" | "O" | "Cat" | null;
    xIsNext: boolean;
    resetBoard: () => void;
}

export default function StatusText({ winner, xIsNext, resetBoard }: Props) {
    const statusText = () => {
        if (winner) {
            return <p>{"Winner: " + winner}</p>
        } else if (xIsNext) {
            return <p>{"Next Player: X"}</p>
        } else {
            return <p>{"Next Player: O"}</p>
        }
    }

    return (
        <div className="button-area">
            {
                statusText()
            }
            {winner ? <button onClick={resetBoard}>New Game</button> : null}
        </div>
    )
}