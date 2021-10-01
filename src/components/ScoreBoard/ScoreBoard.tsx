import React from 'react';

interface Props {
    score: {
        X: number;
        O: number;
        Cat: number;
    }
}

export default function ScoreBoard({ score }: Props) {
    const totalGames = Object.values(score).reduce((x, y) => x + y)
    return (
        <>
            {Object.entries(score).map(([winner, wins]) => <p>{`${winner}: ${wins.toLocaleString()} (${(wins / totalGames * 100).toFixed(2)}%)`}</p>)}
            <p >{`Total Games: ${totalGames.toLocaleString()}`}</p>
        </>
    )
}
