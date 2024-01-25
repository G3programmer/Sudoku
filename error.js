// error.js

let errorCount = 0;

function updateErrorCount() {
    const invalidPlaysSpan = document.querySelector('.invalid');
    if (invalidPlaysSpan) {
        errorCount++;
        invalidPlaysSpan.textContent = errorCount;

        // Verifica se atingiu o número limite de jogadas inválidas (3 vezes)
        if (errorCount >= 3) {
            // Encerra o jogo e exibe a tela de game over
            mostrarMenuScreen();
            // Desabilita a lógica de jogo retornando da função
            return;
        }
    } else {
        console.error("Elemento com a classe 'invalid' não encontrado.");
    }
}

function mostrarMenuScreen() {
    const menuScreen = document.querySelector('.menu-screen');
    const finalTimeSpan = document.querySelector('.final--time span');
    const timeCountSpan = document.querySelector('.time--count');

    // Atualiza os elementos da tela de game over com informações relevantes (tempo, pontuação, etc.)
    finalTimeSpan.textContent = timeCountSpan.textContent;

    // Exibe a tela de game over
    menuScreen.style.display = 'block';
}

function detectarJogadaInvalida(row, col, num, solution) {
    const jogadaValida = isValidMove(sudokuBoard, solution, row, col, num);

    if (!jogadaValida) {
        // Chama a função para incrementar o contador de jogadas inválidas
        updateErrorCount();
    }

    return jogadaValida;
}

function jogadaFeita(row, col, num, solution) {
    // Chama a função para detectar jogadas inválidas
    const jogadaValida = detectarJogadaInvalida(row, col, num, solution);

    if (jogadaValida) {
        // Adicione aqui qualquer outra ação que você deseje realizar para jogadas válidas
        sudokuBoard[row][col] = num;
        drawSudokuBoard();
    } else {
        // Ação a ser tomada para jogadas inválidas
        alert("Movimento inválido! Tente novamente.");
    }
}

// Substitua a chamada abaixo pelos eventos reais do seu jogo
// jogadaFeita(row, col, num, solution);
