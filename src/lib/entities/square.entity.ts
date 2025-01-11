import { BasePiece } from "./base-piece.entity";

export class Square {
    constructor(
        public readonly rowIndex: number,
        public readonly colIndex: number,
        private _piece: BasePiece | null = null,
    ) {}

    set piece(piece: BasePiece) {
        this._piece = piece;
    }

    get piece(): BasePiece | null {
        return this._piece
    }

    get isValidSquare() {
        return (this.rowIndex + this.colIndex) % 2 === 0;
    }
}