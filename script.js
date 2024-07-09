let cp = 'X';
let active = true;
let gameMode = '';
let board = ['', '', '', '', '', '', '', '', ''];

function startGame(mode) {
    gameMode = mode;
    document.getElementById('game-options').style.display = 'none';
    document.getElementById('ttt').style.display = 'grid';
    reset();
}

function afterClick(box) {
    const index = Array.from(box.parentNode.children).indexOf(box);

    if (active && !box.textContent) {
        box.textContent = cp;
        box.classList.add('marked');
        board[index] = cp;

        if (winner(cp)) {
            document.getElementById("announce").innerHTML = cp + " wins!";
            active = false;
        } else if (draw()) {
            document.getElementById("announce").innerHTML = "Game is draw!";
        } else {
            cp = (cp === 'X') ? 'O' : 'X';

            if (gameMode === 'ai' && cp === 'O') {
                aiMove();
            }
        }
    }
}

function aiMove() {
    const bestMove = getBestMove();
    const box = document.getElementsByClassName('box')[bestMove];

    if (box) {
        box.textContent = cp;
        box.classList.add('marked');
        board[bestMove] = cp;

        if (winner(cp)) {
            document.getElementById("announce").innerHTML = cp + " wins!";
            active = false;
        } else if (draw()) {
            document.getElementById("announce").innerHTML = "Game is draw!";
        } else {
            cp = 'X';
        }
    }
}

function getBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(newBoard, depth, isMaximizing) {
    let scores = {
        'O': 10,
        'X': -10,
        'draw': 0
    };

    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'O';
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'X';
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    let winner = null;
    const combs = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let com of combs) {
        let [a, b, c] = com;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
        }
    }

    if (winner === null && board.every(cell => cell !== '')) {
        return 'draw';
    } else {
        return winner;
    }
}

function winner(p) {
    return checkWinner() === p;
}

function draw() {
    return board.every(box => box !== '');
}

function reset() {
    let boxes = document.getElementsByClassName('box');
    for (const box of boxes) {
        box.textContent = '';
        box.classList.remove("marked");
    }
    board = ['', '', '', '', '', '', '', '', ''];
    cp = 'X';
    document.getElementById('announce').innerHTML = '';
    active = true;
}
