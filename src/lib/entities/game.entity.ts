import { Player } from "../types/player.type";
import { SquarePosition } from "../types/square-position.type";
import { BasePiece } from "./base-piece.entity";
import { Pawn } from "./pawn.entity";
import { Queen } from "./queen.entity";
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
                const square = new Square(this, rowIndex, colIndex);
                const player: Player | null = 
                    (boardSize - 1 - rowIndex) < blackStartRows ? 'black' 
                    : rowIndex < whiteStartRows ? 'white' : null;
            
                if (square.isBlackSquare && player) {
                    square.piece = new Pawn(this, player, square);
                }
                return square;
            })
        })

        // Todo: Move to backend
        this.gameId = crypto.randomUUID();
    
    }


    movePiece(fromSquare: Square, toSquare: Square): void {
        const piece = fromSquare.piece;
        if (!piece) {
            throw new Error('No piece to move');
        }

        // Handle capture if it's a capture move
        const capturedPiece = this.getCapturedPiece(fromSquare.position, toSquare.position);
        if (capturedPiece) {
            this.removePiece(capturedPiece);
        }

        // Clear the old square
        fromSquare.piece = null;

        // Update the piece's square reference
        piece.square = toSquare;

        // Set the piece in the new square
        toSquare.piece = piece;

        // Check for promotion
        if (this.shouldPromote(piece)) {
            this.promotePiece(piece);
        }
    }

    private getCapturedPiece(from: SquarePosition, to: SquarePosition): Square | null {
        // If it's a regular move (distance of 1), there's no capture
        if (Math.abs(to.rowIndex - from.rowIndex) <= 1) {
            return null;
        }

        // Get the square between from and to positions
        const middleRow = Math.floor((from.rowIndex + to.rowIndex) / 2);
        const middleCol = Math.floor((from.colIndex + to.colIndex) / 2);
        const middleSquare = this.board[middleRow][middleCol];

        return middleSquare.piece ? middleSquare : null;
    }

    private removePiece(square: Square): void {
        square.piece = null;
    }

    private shouldPromote(piece: BasePiece): boolean {
        if (!(piece instanceof Pawn)) {
            return false;
        }

        const lastRow = piece.player === 'white' ? this.boardSize - 1 : 0;
        return piece.square.position.rowIndex === lastRow;
    }

    private promotePiece(piece: BasePiece): void {
        if (!(piece instanceof Pawn)) {
            return;
        }

        // Create a new Queen piece
        const queen = new Queen(this, piece.player, piece.square);
        piece.square.piece = queen;
    }
}