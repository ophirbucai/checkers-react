import { useCallback, useState } from "react";
import { Game } from "../lib/entities/game.entity";
import { Player } from "../lib/types/player.type";
import { Fragment } from "react";
import { BasePiece } from "../lib/entities/base-piece.entity";

type BoardProps = {
	player: Player;
};

export function Board({ player }: BoardProps) {
	const [game] = useState(new Game(8));
	const [activePiece, setActivePiece] = useState<BasePiece | null>(null);

	const toggleActivePiece = useCallback(
		(piece: BasePiece) => () =>
			setActivePiece((prevPiece) => (prevPiece === piece ? null : piece)),
		[],
	);

	return (
		<div
			className={`board ${player === "white" ? "rotate-180" : ""}`}
			style={{ "--board-size": game.boardSize } as React.CSSProperties}
		>
			{game.board.map((squares, rowIndex) => (
				<Fragment key={rowIndex.toFixed()}>
					{squares.map((square, colIndex) => {
						const isClickable = activePiece?.validMoves.includes(square);
						return (
							<div
								className={`square ${square.isValidSquare ? "black" : ""} ${isClickable ? "active" : ""}`}
								key={colIndex.toFixed()}
							>
								{square.piece && (
									<Piece
										piece={square.piece}
										toggleActivePiece={toggleActivePiece(square.piece)}
									/>
								)}
								{isClickable && (
									<button type="button" className="clickable">
										<span className="sr-only">Move</span>
									</button>
								)}
							</div>
						);
					})}
				</Fragment>
			))}
		</div>
	);
}

function Piece({
	piece,
	toggleActivePiece,
}: { piece: BasePiece; toggleActivePiece: () => void }) {
	return (
		<button
			onClick={toggleActivePiece}
			className={`checker ${piece.player}`}
			type="button"
		>
			<span className="sr-only">{piece.ariaLabel}</span>
		</button>
	);
}
