// Troca entre telas
function irPara(id) {
  document.querySelectorAll(".tela").forEach(tela => tela.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

// Detector simples com várias palavras suspeitas
function verificarNoticia() {
  const texto = document.getElementById("textoNoticia").value.toLowerCase();
  const resultado = document.getElementById("resultado");

  const palavrasSuspeitas = [
    "cura milagrosa", "remédio secreto", "vacina perigosa", "vacina mata", "vacina causa autismo",
    "chip 5g", "terra plana", "fim do mundo", "governo esconde", "mídia comprada",
    "controle da mente", "nova doença inventada", "ganhe dinheiro fácil", "fique rico rápido",
    "100% garantido", "oferta imperdível", "ninguém fala sobre isso", "verdade oculta",
    "segredo revelado", "conspiração", "não tome vacina", "nasa mente", "robôs vão dominar",
    "clique aqui", "compartilhe já", "antes que apaguem", "urgente", "chocante", "proibido"
  ];

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
