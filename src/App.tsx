import { useState } from "react";
import { Board } from "./components/Board";
import { Player } from "./lib/types/player.type";

function App() {
	const [playerSide, setPlayerSide] = useState<Player | null>(null);

	return (
		<main className="home">
			{!playerSide && (
				<div className="menu">
					<button
						className="checker black"
						type="button"
						onClick={() => setPlayerSide("black")}
					>
						<span className="sr-only">Black</span>
					</button>
					<button
						className="checker white"
						type="button"
						onClick={() => setPlayerSide("white")}
					>
						<span className="sr-only">White</span>
					</button>
					<button
						className="checker random"
						type="button"
						onClick={() =>
							setPlayerSide(Math.random() > 0.5 ? "white" : "black")
						}
					>
						<span className="sr-only">Random</span>
					</button>
				</div >
			)}

			{playerSide && <Board player={playerSide} />}
		</main>
	);
}

export default App;
