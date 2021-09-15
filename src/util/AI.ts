import calculateWinner from "./calculateWinner";

export default async function ArtificialIntelligence(handleClick: Function, board: ("X" | "O" | null)[], xIsNext: boolean) {
    if (board.indexOf(null) === -1) return;
    await sleep(500)
    const winIndex = calculateWinMoves(board, xIsNext)
    const blockIndex = calculateBlockMoves(board, xIsNext)
    if (winIndex !== undefined) handleClick(winIndex)
    else if (blockIndex !== undefined) handleClick(blockIndex)
    else handleClick(randomValidSpot(board))
}

const calculateWinMoves = (board: ("X" | "O" | null)[], xIsNext: boolean): number | undefined => {
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

const calculateBlockMoves = (board: ("X" | "O" | null)[], xIsNext: boolean): number | undefined => {
    return calculateWinMoves(board, !xIsNext)
}

const randomValidSpot = (board: ("X" | "O" | null)[]): number => {
    let i;

    do {
        i = Math.round(Math.random() * 9)
    } while (board[i] !== null);

    return i;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
