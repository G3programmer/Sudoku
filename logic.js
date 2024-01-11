document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("SudokuMap");
    const context = canvas.getContext("2d");

    const SIZE = 9;
    const EMPTY = 0;

    const cellSize = 67;
    const areaSize = cellSize * 3;

    // Gerar os números aleatórios (agora com exatamente 12 números iniciais)
    const numb = generateRandomPattern(35);
    let sudokuBoard = createSudokuBoard(numb);
    drawSudokuBoard();

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const clickedRow = Math.floor(y / cellSize);
        const clickedCol = Math.floor(x / cellSize);

        // Validar a jogada
        const inputNumber = prompt("Digite um número de 1 a 9");
        const num = parseInt(inputNumber, 10);

        if (isValidInput(num) && isValidMove(sudokuBoard, clickedRow, clickedCol, num)) {
            sudokuBoard[clickedRow][clickedCol] = num;
            drawSudokuBoard();
        } else {
            alert("Movimento inválido! Tente novamente.");
        }
    });

    function isValidMove(board, row, col, num) {
        return (
            isValidRowMove(board, row, num) &&
            isValidColumnMove(board, col, num) &&
            isValidAreaMove(board, row, col, num)
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
                if (board[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    function generateRandomPattern(initialNumbers) {
        const pattern = Array.from({ length: SIZE }, () => Array(SIZE).fill(EMPTY));

        let generatedNumbers = 0;

        while (generatedNumbers < initialNumbers) {
            const num = Math.floor(Math.random() * 9) + 1;
            const row = Math.floor(Math.random() * SIZE);
            const col = Math.floor(Math.random() * SIZE);

            if (isValidMove(pattern, row, col, num)) {
                pattern[row][col] = num;
                generatedNumbers++;
            }
        }

        return pattern.flat();
    }

    function createSudokuBoard(numb) {
        const board = [];
        let index = 0;

        for (let i = 0; i < SIZE; i++) {
            const row = [];
            for (let j = 0; j < SIZE; j++) {
                row.push(numb[index++]);
            }
            board.push(row);
        }

        return board;
    }

    // Desenhando o tabuleiro
    function drawSudokuBoard() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                const x = col * cellSize;
                const y = row * cellSize;

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
                    context.moveTo((col + 1) * cellSize, row * cellSize);
                    context.lineTo((col + 1) * cellSize, (row + 1) * cellSize);
                    context.stroke();
                }

                if ((row + 1) % 3 === 0 && row !== SIZE - 1) {
                    context.lineWidth = 3;
                    context.beginPath();
                    context.moveTo(col * cellSize, (row + 1) * cellSize);
                    context.lineTo((col + 1) * cellSize, (row + 1) * cellSize);
                    context.stroke();
                }

                context.lineWidth = 1;
            }
        }
    }

    // Definindo números
    function isValidInput(num) {
        return !isNaN(num) && num >= 0 && num <= 9;
    }
});
