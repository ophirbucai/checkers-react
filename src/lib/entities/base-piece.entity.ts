import { Player } from "../types/player.type";
import { SquarePosition } from "../types/square-position.type";
import { Game } from "./game.entity";
import { Square } from "./square.entity";

export abstract class BasePiece {
    protected abstract name: string;
    constructor(
        readonly game: Game, 
        readonly player: Player,
        public square: Square,
    ) {}

    move(toSquare: Square): void {
        if (!this.isValidMove(this.square.position, toSquare.position)) {
            throw new Error('Invalid move');
        }

        this.game.movePiece(this.square, toSquare);
    }

    abstract get validMoves(): Square[];

    abstract isValidMove(from: SquarePosition, to: SquarePosition): boolean;

    get ariaLabel() {
        const { rowIndex, colIndex } = this.square.position;
        return `Row ${rowIndex + 1}, Col ${colIndex + 1}, ${this.name}, ${this.player}`
    }
}