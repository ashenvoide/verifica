function verificarNoticia() {
    const texto = document.getElementById("textoNoticia").value.toLowerCase().trim();
    const resultado = document.getElementById("resultado");

    // Se o usuário não digitou nada
    if (texto.length === 0) {
        resultado.innerHTML = "⚠️ Você precisa digitar um texto para analisarmos.";
        resultado.className = "alerta-aviso";
        return;
    }

    // Se o texto for muito curto ou não parecer uma notícia
    if (texto.length < 30) {
        resultado.innerHTML = "🤔 Isso não parece ser uma notícia.";
        resultado.className = "alerta-aviso";
        return;
    }

    // --- detector normal ---
    let encontrou = false;
    for (let palavra of palavrasSuspeitas) {
        if (texto.includes(palavra)) {
            encontrou = true;
            break;
        }
    }

    if (encontrou) {
        resultado.innerHTML = "🚨 Possível Fake News detectada!";
        resultado.className = "alerta-fake";
    } else {
        resultado.innerHTML = "✅ Não encontramos sinais claros de fake news.";
        resultado.className = "alerta-verdade";
    }
}
