import Board from "./Board";

export default class Player {
    symbol: "X" | "O";
    opponentSymbol: "X" | "O";
    maxDepth: number;
    nodesMap: Map<number, Array<number>>; // value of node , string array of indexes

    /**
     * A Tic Tac Toe Player
     * @constructor
     * @param symbol - Which player, X or O
     * @param maxDepth - Maximum depth to search to for best move.
     */
    constructor(symbol: "X" | "O", maxDepth = -1) {
        this.symbol = symbol
        this.opponentSymbol = symbol === "X" ? "O" : "X"
        this.maxDepth = maxDepth
        this.nodesMap = new Map();
    }

    /**
     * gets the best move given a board state.
     * @param {Board} board - The current state of the board.
     * @param {boolean} maximizing - Whether to maximize or minimize heuristic value.
     * @param {Function} callback - Callback that is called with the index of the best move as an argument.
     * @param {number} depth - The depth of the search tree.
     * @returns the index of the best move.
     */
    public getBestMove(board: Board, maximizing = true, callback: (bestIndex: number) => any = () => { }, depth = 0): number {
        //clear nodesMap if the function is called for a new move
        if (depth === 0) this.nodesMap.clear();

        //If the board state is a terminal one, return the heuristic value
        if (board.isTerminal().winner || depth === this.maxDepth) {
            switch (board.isTerminal().winner) {
                case this.symbol:
                    return 100 - depth;
                case this.opponentSymbol:
                    return -100 + depth;
                default:
                    return 0;
            }
        }

        //Initialize best to the lowest possible value
        let best = maximizing ? -100 : 100;
        //Loop through all empty cells
        board.getAvailableMoves().forEach(index => {
            //Initialize a new board with a copy of our current state
            const child = new Board([...board.state]);
            //Create a child node by inserting the maximizing symbol into the current empty cell
            child.insert(maximizing ? this.symbol : this.opponentSymbol, index);
            //Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
            const nodeValue = this.getBestMove(child, false, callback, depth + 1);
            //Updating best value
            best = maximizing ? Math.max(best, nodeValue) : Math.min(best, nodeValue);

            //If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
            if (depth === 0) {
                //Comma separated indices if multiple moves have the same heuristic value
                const moves = this.nodesMap.has(nodeValue)
                    ? [...(this.nodesMap.get(nodeValue) || []), index]
                    : [index];
                this.nodesMap.set(nodeValue, moves);
            }
        });
        //If it's the main call, return the index of the best move or a random index if multiple indices have the same value
        if (depth === 0) {
            const arr = this.nodesMap.get(best) || [];
            const rand = Math.floor(Math.random() * arr.length);
            const returnValue = arr[rand];
            //run a callback after calculation and return the index
            callback(returnValue);
            return returnValue;
        }
        //If not main call (recursive) return the heuristic value for next calculation
        return best;
    }
}
