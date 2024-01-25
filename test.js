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
    verificarFimEEncerrarCronometro(); // Chama a função para verificar o fim do jogo
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
    // Implemente a lógica para verificar se o jogo foi concluído
    // Exemplo hipotético:
    return tempoTotal >= 60; // Jogo termina após 60 segundos (para fins de teste)
}

function verificarFimEEncerrarCronometro() {
    if (verificarFimDoJogo()) {
        pausarCronometro();
        // Aqui você pode adicionar qualquer outra lógica que precisa ser executada quando o jogo termina
    }
}

// Chama iniciarCronometro() para iniciar o cronômetro automaticamente
iniciarCronometro();
