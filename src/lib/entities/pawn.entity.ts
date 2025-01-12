import { SquarePosition } from "../types/square-position.type";
import { BasePiece } from "./base-piece.entity";
import { Square } from "./square.entity";

export class Pawn extends BasePiece {
    readonly name = 'Pawn';
    private readonly moveDirection = this.player === 'white' ? 1 : -1;
    private readonly maxSteps = 1;

    private isMovingForward(from: SquarePosition, to: SquarePosition): boolean {
        const rowDiff = to.rowIndex - from.rowIndex;
        return Math.sign(rowDiff) === this.moveDirection;
    }

    isValidMove(from: SquarePosition, to: SquarePosition): boolean {
        if (!this.isMovingForward(from, to)) {
            return false;
        }

        const movement = this.calculateMovement(from, to);
        
        return this.isRegularMove(movement, to) || this.isCaptureMove(movement, from, to);
    }

    get validMoves(): Square[] {
        const currentPosition = this.square.position;
        const possibleMoves = [
            ...this.getPossibleRegularMoves(currentPosition),
            ...this.getPossibleCaptureMoves(currentPosition)
        ];

        return possibleMoves.filter(square => 
            this.square.isWithinBoard(square?.position) && 
            this.isValidMove(currentPosition, square.position)
        );
    }

    private getPossibleRegularMoves(position: SquarePosition): Square[] {
        const { rowIndex, colIndex } = position;
        return [
            this.square.getSquareAt(rowIndex + this.moveDirection, colIndex + 1),
            this.square.getSquareAt(rowIndex + this.moveDirection, colIndex - 1)
        ].filter((square): square is Square => square !== undefined);
    }

    private getPossibleCaptureMoves(position: SquarePosition): Square[] {
        const { rowIndex, colIndex } = position;
        const captureRow = rowIndex + (this.moveDirection * 2);
        return [
            this.square.getSquareAt(captureRow, colIndex + 2),
            this.square.getSquareAt(captureRow, colIndex - 2)
        ].filter((square): square is Square => square !== undefined);
    }

    private calculateMovement(from: SquarePosition, to: SquarePosition): {
        rowDiff: number;
        colDiff: number;
    } {
        return {
            rowDiff: Math.abs(to.rowIndex - from.rowIndex),
            colDiff: Math.abs(to.colIndex - from.colIndex)
        };
    }

    private isRegularMove(
        movement: { rowDiff: number; colDiff: number }, 
        to: SquarePosition
    ): boolean {
        return movement.rowDiff === this.maxSteps && 
               movement.colDiff === this.maxSteps &&
               this.square.isSquareEmpty(to);
    }

    private isCaptureMove(
        movement: { rowDiff: number; colDiff: number },
        from: SquarePosition,
        to: SquarePosition
    ): boolean {
        if (movement.rowDiff !== this.maxSteps + 1 || 
            movement.colDiff !== this.maxSteps + 1) {
            return false;
        }

        const middleSquare = this.square.getMiddleSquare(from, to);
        return this.canCapturePiece(middleSquare) && this.square.isSquareEmpty(to);
    }

    private canCapturePiece(square: Square | null): boolean {
        return !!square?.piece && square?.piece.player !== this.player;
    }
}