import useTictactoe from "../hooks/use-tictactoe";
import { useState } from "react";

function Tictactoe() {
    const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");
    const {grid, handleClick, resetGame, getStatus, startGame} = useTictactoe(3, playerSymbol);

    return (
        <div className='game max-w-auto m-auto flex text-align p-10 flex-col'>
            <div className='status text-s flex justify-between mb-16'>
                {getStatus()}
                <button className='reset-button bg-slate-500 cursor-pointer p-2 rounded-sm hover:bg-slate-100 text-black' 
                        onClick={resetGame}>Reset</button>
            </div>

            <div className="flex gap-4 mb-4">
                <button onClick={() => setPlayerSymbol("X")} className={`px-3 py-3 rounded-xl font-bold text-xl transition-all ${playerSymbol === "X" ? "bg-blue-600 text-white scale-105" : "bg-gray-200 hover:bg-gray-300"}`}>X</button>
                <button onClick={() => setPlayerSymbol("O")} className={`px-3 py-3 rounded-xl font-bold text-xl transition-all ${playerSymbol === "O" ? "bg-red-600 text-white scale-105" : "bg-gray-200 hover:bg-gray-300"}`}>O</button>
                <button onClick={startGame} className="px-8 py-3 text-lg font-bold rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all shadow-md">JOUER</button>
            </div>
          
            <div className='grid justify-center' style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {grid.map((cell, index) => (
                    <button key={index} className="w-[100px] h-[100px] text-4xl font-bold border-2 border-gray-400 hover:bg-slate-400" disabled={cell !== null} onClick={() => handleClick(index)}>
                        {cell}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tictactoe;