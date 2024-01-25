document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("SudokuMap");
    const context = canvas.getContext("2d");

    const SIZE = 9;
    const EMPTY = 0;

    const cellSize = 60;
    const margin = 1;

    let invalidMovesCount = 0;
    const maxInvalidMoves = 3;

    function shuffleBoard(board) {
        const swaps = 20;

        function swapRows() {
            const block = Math.floor(Math.random() * 3) * 3;
            const row1 = block + Math.floor(Math.random() * 3);
            let row2;

            do {
                row2 = block + Math.floor(Math.random() * 3);
            } while (row1 === row2);

            [board[row1], board[row2]] = [board[row2], board[row1]];
        }

        function swapCols() {
            transpose(board);
            swapRows();
            transpose(board);
        }

        for (let i = 0; i < swaps; i++) {
            Math.random() < 0.5 ? swapRows() : swapCols();
        }
    }

    function transpose(matrix) {
        const size = matrix.length;
        for (let i = 0; i < size; i++) {
            for (let j = i + 1; j < size; j++) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }
    }

    function generateSudokuPuzzle(solution, visibleNumbers) {
        let puzzle = JSON.parse(JSON.stringify(solution));

        let cellsToRemove = SIZE * SIZE - visibleNumbers;

        while (cellsToRemove > 0) {
            const row = Math.floor(Math.random() * SIZE);
            const col = Math.floor(Math.random() * SIZE);

            if (puzzle[row][col] !== EMPTY) {
                puzzle[row][col] = EMPTY;
                cellsToRemove--;
            }
        }

        return puzzle;
    }

    function generateSudokuSolution() {
        const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(EMPTY));
        solveSudoku(board);
        return board;
    }

    function solveSudoku(board) {
        function findEmptyLocation() {
            for (let row = 0; row < SIZE; row++) {
                for (let col = 0; col < SIZE; col++) {
                    if (board[row][col] === EMPTY) {
                        return { row, col };
                    }
                }
            }
            return null;
        }

        function isValidPlacement(row, col, num) {
            return (
                isValidRowMove(board, row, num) &&
                isValidColumnMove(board, col, num) &&
                isValidAreaMove(board, row, col, num)
            );
        }

        function solve() {
            const emptyLocation = findEmptyLocation();

            if (!emptyLocation) {
                return true;
            }

            const { row, col } = emptyLocation;

            for (let num = 1; num <= SIZE; num++) {
                if (isValidPlacement(row, col, num)) {
                    board[row][col] = num;

                    if (solve()) {
                        return true;
                    }

                    board[row][col] = EMPTY;
                }
            }

            return false;
        }

        solve();
    }

    function isValidMove(board, solution, row, col, num) {
        return (
            isValidRowMove(board, row, num) &&
            isValidColumnMove(board, col, num) &&
            isValidAreaMove(solution, row, col, num)
        );
    }

    function isValidRowMove(board, row, num) {
        return !board[row].includes(num);
    }

    function isValidColumnMove(board, col, num) {
        for (let i = 0; i < SIZE; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }
        return true;
    }

    function isValidAreaMove(board, row, col, num) {
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num && (i !== row || j !== col)) {
                    return false;
                }
            }
        }
        return true;
    }

    function drawSudokuBoard() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                const x = col * (cellSize + margin);
                const y = row * (cellSize + margin);

                context.fillStyle = "rgb(198, 230, 255)";
                context.fillRect(x, y, cellSize, cellSize);

                context.strokeStyle = "#000";
                context.strokeRect(x, y, cellSize, cellSize);

                const value = sudokuBoard[row][col];
                if (value !== EMPTY) {
                    context.font = "24px Arial";
                    context.fillStyle = "#000";
                    context.fillText(value, x + cellSize / 2 - 8, y + cellSize / 2 + 8);
                }
            }
        }

        drawGridLines();
    }

    function drawGridLines() {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if ((col + 1) % 3 === 0 && col !== SIZE - 1) {
                    context.lineWidth = 3;
                    context.beginPath();
                    context.moveTo((col + 1) * (cellSize + margin), row * (cellSize + margin));
                    context.lineTo((col + 1) * (cellSize + margin), (row + 1) * (cellSize + margin));
                    context.stroke();
                }

                if ((row + 1) % 3 === 0 && row !== SIZE - 1) {
                    context.lineWidth = 3;
                    context.beginPath();
                    context.moveTo(col * (cellSize + margin), (row + 1) * (cellSize + margin));
                    context.lineTo((col + 1) * (cellSize + margin), (row + 1) * (cellSize + margin));
                    context.stroke();
                }
            }
            context.lineWidth = 1;
        }
    }

    function isValidInput(num) {
        return !isNaN(num) && num >= 0 && num <= 9;
    }

    let solution = generateSudokuSolution();
    shuffleBoard(solution);
    let sudokuBoard = generateSudokuPuzzle(solution, 25);
    drawSudokuBoard();

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const clickedRow = Math.floor(y / (cellSize + margin));
        const clickedCol = Math.floor(x / (cellSize + margin));

        if (sudokuBoard[clickedRow][clickedCol] !== EMPTY) {
            alert("Esta célula já está preenchida automaticamente.");
            return;
        }

        const inputNumber = prompt("Digite um número de 1 a 9");
        const num = parseInt(inputNumber, 10);

        if (isValidInput(num) && isValidMove(sudokuBoard, solution, clickedRow, clickedCol, num)) {
            sudokuBoard[clickedRow][clickedCol] = num;
            drawSudokuBoard();
        } else {
            alert("Movimento inválido! Tente novamente.");
            invalidMovesCount++;

            document.querySelector('.invalid').textContent = invalidMovesCount;

            if (invalidMovesCount >= maxInvalidMoves) {
                showGameOverMenu();
            }
        }
    });

    function showGameOverMenu() {
        const menuScreen = document.querySelector('.menu-screen');
        const invalidMovesSpan = document.querySelector('.invalid');

        invalidMovesSpan.textContent = invalidMovesCount;

        menuScreen.style.display = 'flex';
    }

    function resetGame() {
        const menuScreen = document.querySelector('.menu-screen');
        menuScreen.style.display = 'none';

        invalidMovesCount = 0;

        solution = generateSudokuSolution();
        shuffleBoard(solution);
        sudokuBoard = generateSudokuPuzzle(solution, 25);
        drawSudokuBoard();

        document.querySelector('.invalid').textContent = invalidMovesCount;
    }

    const btnPlayAgain = document.querySelector('.btn-play');
    btnPlayAgain.addEventListener('click', function () {
        resetGame();
    });
});
