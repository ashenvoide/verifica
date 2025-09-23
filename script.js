
// Lista de palavras suspeitas (pode aumentar à vontade)
const palavrasSuspeitas = [
    "cura milagrosa", "remédio secreto", "vacina perigosa", "vacina mata", "vacina causa autismo",
    "chip 5g", "chip na vacina", "terra plana", "fim do mundo", "governo esconde",
    "cientistas escondem", "mídia comprada", "controle da mente", "nova doença inventada",
    "ganhe dinheiro fácil", "fique rico rápido", "100% garantido", "oferta imperdível",
    "ninguém fala sobre isso", "verdade oculta", "segredo revelado", "conspiração",
    "não tome vacina", "nasa mente", "trabalhe 1 hora por dia", "robôs vão dominar"
];

function verificarNoticia() {
    const texto = document.getElementById("textoNoticia").value.toLowerCase().trim();
    const resultado = document.getElementById("resultado");

    // Se o usuário não digitou nada
    if (texto.length === 0) {
        resultado.innerHTML = "⚠️ Você precisa digitar um texto para analisarmos.";
        resultado.className = "alerta-aviso";
        return;
    }

    // Se o texto for muito curto ou não parecer notícia
    if (texto.length < 30) {
        resultado.innerHTML = "🤔 Isso não parece ser uma notícia.";
        resultado.className = "alerta-aviso";
        return;
    }

    // Detector de fake news
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

   Nota Pública (Registre-se para notas privadas)

Buscar
Minhas Notas Salvas
Ordenar por Título Ordenar por Atualização
Todas as Notas
Caixa de Entrada
Gerenciar Pastas
Read Note Nota 09/23/2025 22:3 Read Note Nota 08/09/2025 22:3 
Download on the Apple Store   Get it on Google Play

© 2009-2025 aNotepad.com

Sobre Privacidade Recursos Criador de Currículo Fax Grátis Denunciar Abuso

aNotepad.com é seu bloco de notas online diário. Você pode criar e compartilhar notas online sem precisar fazer login.
Você pode usar um editor de texto rico e baixar sua nota como documento PDF ou Word.
O melhor de tudo - aNotepad é um bloco de notas online rápido, limpo e fácil de usar.


 
