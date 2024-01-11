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

// Chama iniciarCronometro() para iniciar o cronômetro automaticamente
iniciarCronometro();
