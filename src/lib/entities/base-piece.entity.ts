import { Player } from "../types/player.type";
import { Game } from "./game.entity";
import { Square } from "./square.entity";

export abstract class BasePiece {
    protected abstract name: string;
    constructor(
        readonly game: Game, 
        readonly player: Player,
        public square: Square,
    ) {}

    move(square: Square) {
        this.square = square;
    }

    abstract get validMoves(): Square[];

    get ariaLabel() {
        const { rowIndex, colIndex } = this.square;
        return `Row ${rowIndex + 1}, Col ${colIndex + 1}, ${this.name}, ${this.player}`
    }
}