export default class Board {
    state: ('' | 'X' | 'O')[];

    /**
     * Tic Tac Toe board
     * @constructor
     * @param {string[]} state - The initial state of the board.
     */
    constructor(state = ["", "", "", "", "", "", "", "", ""] as ('' | 'X' | 'O')[]) {
        this.state = state;
    }

    /**
     * Prints the board to the console
     */
    public printFormattedBoard() {
        let formattedString = "";
        this.state.forEach((cell, index) => {
            formattedString += cell ? ` ${cell} |` : "   |";
            if ((index + 1) % 3 === 0) {
                formattedString = formattedString.slice(0, -1);
                if (index < 8)
                    formattedString +=
                        "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
            }
        });
        console.log("%c" + formattedString, "color: #c11dd4;font-size:16px");
    }

    /**
     * isEmpty
     * @returns if the board is empty.
     */
    public isEmpty() {
        return this.state.every((square) => square === '')
    }

    /**
     * isFull
     * @returns if there are no more valid spaces to move.
     */
    public isFull() {
        return this.state.every(cell => cell);
    }

    /**
     * isTerminal
     * @returns an object containing the winner if there is one.
     */
    public isTerminal(): { winner: "X" | "O" | "Cat" | '' } {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        if (this.isEmpty()) return { winner: '' };
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (this.state[a] && this.state[a] === this.state[b] && this.state[a] === this.state[c]) {
                return { winner: this.state[a] as "X" | "O" };
            }
        }
        if (this.isFull()) return { winner: 'Cat' }
        return { winner: '' };
    }

    /**
     * inserts a symbol into the board
     * @param symbol - The symbol to be inserted.
     * @param position - The index of the position to insert the symbol at.
     * @returns if move is valid or not.
     */
    public insert(symbol: 'X' | 'O', position: number) {
        if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) throw new Error("Cell index does not exist!")
        if (this.state[position]) return false;
        this.state[position] = symbol;
        return true;
    }

    /**
     * gets an array of indices for valid moves
     * @returns array of indices for valid moves
     */
    public getAvailableMoves() {
        return this.state.map((cell, index) => cell ? null : index).filter((index): index is number => !!index || index === 0)
    }

}