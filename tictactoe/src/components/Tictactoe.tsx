import useTictactoe from "../hooks/use-tictactoe";
import { useState } from "react";

function Tictactoe() {
    const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");
    const { grid, handleClick, resetGame, getStatus, startGame } =
        useTictactoe(3, playerSymbol);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
            <div className="w-full max-w-md flex justify-between items-center mb-10 bg-slate-800/60 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-slate-700">
                <span className="text-sm text-slate-200">{getStatus()}</span>

                <button
                    className="px-3 py-1.5 text-sm rounded-lg bg-red-500/80 hover:bg-red-500 transition shadow-md"
                    onClick={resetGame}
                >
                    Reset
                </button>
            </div>

            <div className="flex gap-3 mb-8">
                <button
                    onClick={() => setPlayerSymbol("X")}
                    className={`px-4 py-2 rounded-xl font-bold text-lg transition-all shadow-md ${
                        playerSymbol === "X"
                            ? "bg-blue-500 text-white scale-105 shadow-blue-500/30"
                            : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                    }`}
                >
                    X
                </button>

                <button
                    onClick={() => setPlayerSymbol("O")}
                    className={`px-4 py-2 rounded-xl font-bold text-lg transition-all shadow-md ${
                        playerSymbol === "O"
                            ? "bg-pink-500 text-white scale-105 shadow-pink-500/30"
                            : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                    }`}
                >
                    O
                </button>

                <button
                    onClick={startGame}
                    className="px-6 py-2 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20"
                >
                    JOUER
                </button>
            </div>
            <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
            >
                {grid.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        disabled={cell !== null}
                        className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-xl border border-slate-600 bg-slate-800/70 text-3xl font-bold flex items-center justify-center transition-all hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                    >
                        <span
                            className={
                                cell === "X"
                                    ? "text-blue-400"
                                    : "text-pink-400"
                            }
                        >
                            {cell}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tictactoe;