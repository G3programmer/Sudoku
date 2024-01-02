document.addEventListener("DOMContentLoaded", function () {
  drawSudokuBoard();
});

function drawSudokuBoard() {
  const canvas = document.getElementById("SudokuMap");
  const context = canvas.getContext("2d");

  // Tamanho
  const cellSize = 67;

  // Tamanho da área 3x3
  const areaSize = cellSize * 3;

  // tabuleiro de Sudoku definido
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {

      // Calcula as coordenadas x e y da célula
      const x = col * cellSize;
      const y = row * cellSize;

      // Definindo o quadrado 
      context.fillStyle = "rgb(198, 230, 255)";
      context.fillRect(x, y, cellSize, cellSize);

      // Definindo a borda da célula
      context.strokeStyle = "#000";
      context.strokeRect(x, y, cellSize, cellSize);

      // Verifica se está no final de cada quadrado 3x3 e desenha uma linha em negrito
      if ((col + 1) % 3 === 0 && col !== 8) {
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(x + cellSize, y);
        context.lineTo(x + cellSize, y + areaSize);
        context.stroke();
      }

      if ((row + 1) % 3 === 0 && row !== 8) {
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(x, y + cellSize);
        context.lineTo(x + areaSize, y + cellSize);
        context.stroke();
      }

      // Reseta a largura da borda para o valor padrão
      context.lineWidth = 1;
    }
  }
}
