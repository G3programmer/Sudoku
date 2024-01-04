document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("SudokuMap");
    const context = canvas.getContext("2d");

    const SIZE = 9;
    const EMPTY = 0;

    const cellSize = 67;
    const areaSize = cellSize * 3;

    //Gerar o número aleatório
    const pose = generateRandomPose();

    let sudokuBoard = createSudokuBoard(pose);

    drawSudokuBoard();

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const clickedRow = Math.floor(y / cellSize);
        const clickedCol = Math.floor(x / cellSize);

        const inputNumber = prompt("Digite um número de 1 a 9");
        const num = parseInt(inputNumber, 10);

        if (isValidInput(num)) {
            sudokuBoard[clickedRow][clickedCol] = num;
            drawSudokuBoard();
        } else {
            alert("Número inválido. Tente novamente.");
        }
    });

    function generateRandomPose() {
        const randomPose = [];
        for (let i = 0; i < SIZE * SIZE; i++) {
            randomPose.push(Math.floor(Math.random() * 9) + 1);
        }
        return randomPose;
    }

    function createSudokuBoard(pose) {
        const board = [];
        let index = 0;

        for (let i = 0; i < SIZE; i++) {
            const row = [];
            for (let j = 0; j < SIZE; j++) {
                row.push(pose[index++]);
            }
            board.push(row);
        }

        return board;
    }

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

  function isValidInput(num) {
      return !isNaN(num) && num >= 0 && num <= 9;
  }
});
