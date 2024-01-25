// Seu arquivo principal (por exemplo, main.js)

import { increaseScore, getScore, resetScore } from './score.js';

// Restante do seu código...

// Dentro da função onde o jogador acerta um número
if (isValidInput(num) && isValidMove(sudokuBoard, solution, clickedRow, clickedCol, num)) {
    sudokuBoard[clickedRow][clickedCol] = num;
    increaseScore(50); // Aumenta 50 pontos ao acertar um número
    drawSudokuBoard();
} else {
    alert("Movimento inválido! Tente novamente.");
}

// Para obter o score
const currentScore = getScore();
console.log(`Pontuação atual: ${currentScore}`);
