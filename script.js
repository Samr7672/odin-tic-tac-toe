const start=document.querySelector(".submit")
const reset=document.querySelector(".reset")



reset.addEventListener("click",()=>{
    console.log("restarting the game ......")
    const squares=document.querySelectorAll(".board");
    squares.forEach(square => {

    square.textContent="";  
    });
})

start.addEventListener("click",()=>{
    console.log("hello world");
    const container=document.querySelector(".container");
    container.style.display="grid";
})
const GameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        const boardDivs = document.querySelectorAll(".board");
        boardDivs.forEach((div, index) => {
            div.innerText = board[index];
        });
    };

    const update = (index, value) => {
        if (board[index] === "") {
            board[index] = value;
            render();
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        render();
    };

    return { render, update, resetBoard, getBoard: () => board };
})();

const createPlayer = (name, mark) => {
    return { name, mark };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let isGameOver = false;

    const start = () => {
        const p1Name = document.querySelector("#player1").value || "Player 1";
        const p2Name = document.querySelector("#player2").value || "Player 2";
        players = [createPlayer(p1Name, "X"), createPlayer(p2Name, "O")];
        currentPlayerIndex = 0;
        isGameOver = false;
        GameBoard.resetBoard();
    };

    const handleClick = (index) => {
        if (isGameOver || players.length === 0) return;

        if (GameBoard.update(index, players[currentPlayerIndex].mark)) {
            if (checkWin()) {
                isGameOver = true;
                alert(`${players[currentPlayerIndex].name} Wins!`);
            } else if (GameBoard.getBoard().every(cell => cell !== "")) {
                isGameOver = true;
                alert("It's a Tie!");
            } else {
                currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            }
        }
    };

    const checkWin = () => {
        const b = GameBoard.getBoard();
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return wins.some(pattern => {
            const [a, b1, c] = pattern;
            return b[a] && b[a] === b[b1] && b[a] === b[c];
        });
    };

    return { start, handleClick };
})();

document.querySelector(".submit").addEventListener("click", () => Game.start());
document.querySelector(".reset").addEventListener("click", () => Game.start());

document.querySelectorAll(".board").forEach((div, index) => {
    div.addEventListener("click", () => Game.handleClick(index));
});
