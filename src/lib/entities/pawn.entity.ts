import { BasePiece } from "./base-piece.entity";
import { Square } from "./square.entity";

export class Pawn extends BasePiece {
    name = 'Pawn'

    get validMoves(): Square[] {
        const { rowIndex, colIndex } = this.square;
        const direction = this.player === 'white' ? 1 : -1;
        const nextRow = this.game.board[rowIndex + direction];
        const nextRowSquares: Square[] = [];
        if (colIndex !== 0 && nextRow[colIndex - 1].piece === null) {
            nextRowSquares.push(nextRow[colIndex - 1])
        }
        if (colIndex !== 7 && nextRow[colIndex + 1].piece === null) {
            nextRowSquares.push(nextRow[colIndex + 1]);
        }
        return nextRowSquares;
    }
}