import { SquarePosition } from "../types/square-position.type";
import { BasePiece } from "./base-piece.entity";
import { Game } from "./game.entity";

export class Square {
    public readonly position: SquarePosition;
    constructor(
        private readonly game: Game,
        private readonly rowIndex: number,
        private readonly colIndex: number,
        private _piece: BasePiece | null = null,
    ) {
        this.position = { rowIndex,colIndex };
    }

    set piece(piece: BasePiece | null) {
        this._piece = piece;
    }

    get piece(): BasePiece | null {
        return this._piece
    }

    get isBlackSquare() {
        return (this.rowIndex + this.colIndex) % 2 === 0;
    }

    isWithinBoard(position?: SquarePosition): position is SquarePosition {
        if (!position) return false;
        return position.rowIndex >= 0 &&
               position.rowIndex < this.game.boardSize &&
               position.colIndex >= 0 &&
               position.colIndex < this.game.boardSize;
    }

    isSquareEmpty(position: SquarePosition): boolean {
        return this.game.board[position.rowIndex][position.colIndex].piece === null;
    }

    getMiddleSquare(from: SquarePosition, to: SquarePosition): Square | null {
        const middleRow = Math.floor((from.rowIndex + to.rowIndex) / 2);
        const middleCol = Math.floor((from.colIndex + to.colIndex) / 2);
        return this.getSquareAt(middleRow, middleCol);
    }

    getSquareAt(row: number, col: number): Square | null {
        return this.game.board[row]?.[col] || null;
    }
}