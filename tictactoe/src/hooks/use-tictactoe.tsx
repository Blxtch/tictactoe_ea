import { useState} from "react"


const useTictactoe = (size = 3, playerSymbol: "X" | "O" = "X") => {
    const [grid, setGrid] = useState(() => Array(size * size).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const botSymbol = playerSymbol === "X" ? "O" : "X";
    const currentPlayer = isXNext ? "X" : "O";

      const startGame = () => {
        resetGame();     
        if (playerSymbol === "O") {
                playBot(grid, isXNext);
        }
    };
    
    const WINNING = (() => {
        return [
            ...Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => i * size + j)),
            ...Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => j * size + i)),
            Array.from({ length: size }, (_, i) => i * size + i),
            Array.from({ length: size }, (_, i) => i * size + (size - 1 - i))
        ];
    })();

    const playBot = (currentGrid: (string | null)[], nextIsX: boolean) => {
        if (getWinner(currentGrid) || !currentGrid.includes(null)) return;
        
        const pick = Math.floor(Math.random() * currentGrid.length);
        if (currentGrid[pick] !== null) return playBot(currentGrid, nextIsX);
        
        const newGrid = [...currentGrid];
        newGrid[pick] = nextIsX ? "X" : "O";
        setGrid(newGrid);
        setIsXNext(!nextIsX);
    };

    const winningCondition = (currentGrid: (string | null)[]) => {
        for (let i = 0; i < WINNING.length; i++) {
            const combination = WINNING[i];
            const firstCell = currentGrid[combination[0]];
            if (firstCell && combination.every(index => currentGrid[index] === firstCell)) {
                return firstCell;
            }
        }
        return null
    };

    const getWinner = (currentGrid: (string | null)[]) => {
        return winningCondition(currentGrid);
    };

    const handleClick = (index: number) => {
        if (currentPlayer !== playerSymbol) return;
        if (winningCondition(grid) || grid[index]) return;
    
        const newGrid = [...grid];
        newGrid[index] = isXNext ? "X" : "O";
        const nextIsX = !isXNext;
    
        setGrid(newGrid);
        
    
        if (nextIsX ? botSymbol === "X" : botSymbol === "O") {
            setTimeout(() => {
                playBot(newGrid, nextIsX);
            }, 250);}
    };

    const getStatus = () => {
        const winner= winningCondition(grid);
        if (winner) return `Le joueur ${winner} gagne!`;
        if(!grid.includes(null)) return 'égalité';
        return `Aux ${isXNext ? "X" : "O"} de jouer`;
    };

    const resetGame = () => {
        setGrid(Array(size * size).fill(null));
        setIsXNext(true);
    };

    return {grid, handleClick,isXNext, winningCondition,getStatus,resetGame, startGame};

    
};
export default useTictactoe;