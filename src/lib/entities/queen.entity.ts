import { SquarePosition } from "../types/square-position.type";
import { BasePiece } from "./base-piece.entity";
import { Square } from "./square.entity";

export class Queen extends BasePiece {
    name = 'Queen'
    get validMoves(): Square[] {
        throw new Error("Method not implemented.");
    }

    isValidMove(from: SquarePosition, to: SquarePosition): boolean {
        console.log(from, to)
        throw new Error("Method not implemented.");
    }
    
}