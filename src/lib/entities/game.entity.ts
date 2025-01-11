import { Player } from "../types/player.type";
import { Pawn } from "./pawn.entity";
import { Square } from "./square.entity";

export class Game {
    board: Square[][];
    gameId: string;

    constructor(readonly boardSize = 8, startRows = { black: 3, white: 3 }) {
        let blackStartRows = Math.min(boardSize - startRows.white - 1, startRows.black);
        const whiteStartRows = Math.min(boardSize - blackStartRows - 1, startRows.white);
        blackStartRows = Math.min(boardSize - whiteStartRows - 1, blackStartRows);
        
        this.board = new Array(boardSize).fill(null).map((_, rowIndex) => {
            return new Array(boardSize).fill(null).map((_, colIndex) => {
                const square = new Square(rowIndex, colIndex);
                const player: Player | null = 
                    (boardSize - 1 - rowIndex) < blackStartRows ? 'black' 
                    : rowIndex < whiteStartRows ? 'white' : null;
            
                if (square.isValidSquare && player) {
                    square.piece = new Pawn(this, player, square);
                }
                return square;
            })
        })

        // Todo: Move to backend
        this.gameId = crypto.randomUUID();
    
    }
}