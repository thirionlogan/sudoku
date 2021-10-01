import calculateWinner from "./calculateWinner";
import { Board } from "../types"

export default async function ArtificialIntelligence(handleClick: Function, board: Board, xIsNext: boolean) {
    if (board.indexOf(null) === -1) return;
    const winIndex = calculateWinMoves(board, xIsNext)
    const blockIndex = calculateBlockMoves(board, xIsNext)
    if (winIndex !== undefined) handleClick(winIndex)
    else if (blockIndex !== undefined) handleClick(blockIndex)
    else handleClick(randomValidSpot(board))
}

const calculateWinMoves = (board: Board, xIsNext: boolean): number | undefined => {
    const player = xIsNext ? "X" : "O";
    for (let index = 0; index < board.length; index++) {
        if (board[index] === null) {
            const boardCopy = [...board];
            boardCopy[index] = player;
            const winner = calculateWinner(boardCopy)
            if (winner === player || winner === "Cat") return index;
        }
    }
}

const calculateBlockMoves = (board: Board, xIsNext: boolean): number | undefined => {
    return calculateWinMoves(board, !xIsNext)
}

const randomValidSpot = (board: Board): number => {
    let i;

    do {
        i = Math.round(Math.random() * 9)
    } while (board[i] !== null);

    return i;
}
