// time.js

let tempoTotal = 0;
let cronometro;

function formatarTempo(tempo) {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;

    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function atualizarCronometro() {
    tempoTotal++;
    document.querySelector('.time--count').innerText = formatarTempo(tempoTotal);
    verificarFimEEncerrarCronometro();
}

function iniciarCronometro() {
    cronometro = setInterval(atualizarCronometro, 1000);
}

function pausarCronometro() {
    clearInterval(cronometro);
}

function zerarCronometro() {
    clearInterval(cronometro);
    tempoTotal = 0;
    document.querySelector('.time--count').innerText = formatarTempo(tempoTotal);
}

function verificarFimDoJogo() {
    // Aqui você deve implementar a lógica para verificar se o jogo terminou.
    // Por exemplo, você pode verificar se todas as células foram preenchidas corretamente.
    // Se o jogo terminar, retorne true, caso contrário, retorne false.
    // Vou usar um exemplo simples para ilustrar:

    const todasCelulasPreenchidas = true; // Substitua isso pela lógica real do seu jogo

    // Se todas as células estiverem preenchidas, considere o jogo encerrado
    return todasCelulasPreenchidas;
}


function verificarFimEEncerrarCronometro() {
    if (verificarFimDoJogo()) {
        pausarCronometro();
        encerrarJogo();
    }
}

function encerrarJogo() {
    // Lógica para encerrar o jogo
    console.log("Jogo encerrado!");
}

function verificarFimEEncerrarCronometro() {
    if (verificarFimDoJogo()) {
        pausarCronometro();
        encerrarJogo();
    }
}


// Chama iniciarCronometro() para iniciar o cronômetro automaticamente
iniciarCronometro();
